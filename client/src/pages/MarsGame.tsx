import { useState, useEffect, useCallback } from 'react';
import { PlacedItem, HabitatItemType, Resources, INITIAL_RESOURCES } from '@/lib/gameTypes';
import { soundManager } from '@/lib/soundEffects';
import { saveGame, loadGame, hasSavedGame } from '@/lib/gameStorage';
import ResourceBar from '@/components/ResourceBar';
import InventoryPanel from '@/components/InventoryPanel';
import MarsCanvas from '@/components/MarsCanvas';
import ControlBar from '@/components/ControlBar';
import WelcomeModal from '@/components/WelcomeModal';
import { useToast } from '@/hooks/use-toast';

export default function MarsGame() {
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [resources, setResources] = useState<Resources>(INITIAL_RESOURCES);
  const [selectedItemType, setSelectedItemType] = useState<HabitatItemType | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hasVisited = localStorage.getItem('mars-habitat-visited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('mars-habitat-visited', 'true');
    }

    const savedData = loadGame();
    if (savedData) {
      setPlacedItems(savedData.placedItems);
      setResources(savedData.resources);
      console.log('Game loaded from localStorage');
    }
  }, []);

  const calculateResources = useCallback((items: PlacedItem[]): Resources => {
    const newResources = { ...INITIAL_RESOURCES };

    items.forEach((item) => {
      newResources.oxygen += item.type.resourceImpact.oxygen;
      newResources.power += item.type.resourceImpact.power;
      newResources.water += item.type.resourceImpact.water;
      newResources.food += item.type.resourceImpact.food;
    });

    return newResources;
  }, []);

  useEffect(() => {
    const newResources = calculateResources(placedItems);
    setResources(newResources);

    const hasLowResource = Object.values(newResources).some((value) => value < 20);
    if (hasLowResource && placedItems.length > 0 && soundEnabled) {
      soundManager.warning();
    }
  }, [placedItems, calculateResources, soundEnabled]);

  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const handleItemSelect = (itemType: HabitatItemType) => {
    setSelectedItemType(itemType);
    setSelectedItemId(null);
    if (soundEnabled) soundManager.click();
  };

  const handlePlaceItem = (x: number, y: number) => {
    if (!selectedItemType) return;

    const newItem: PlacedItem = {
      id: `${selectedItemType.id}-${Date.now()}-${Math.random()}`,
      type: selectedItemType,
      x,
      y,
      rotation: 0,
    };

    setPlacedItems((prev) => [...prev, newItem]);
    setSelectedItemType(null);
    if (soundEnabled) soundManager.placement();
    console.log('Placed item:', selectedItemType.name, 'at', x, y);
  };

  const handleSelectItem = (itemId: string | null) => {
    setSelectedItemId(itemId);
    setSelectedItemType(null);
    if (itemId && soundEnabled) soundManager.click();
  };

  const handleMoveItem = (itemId: string, x: number, y: number) => {
    setPlacedItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, x, y } : item))
    );
  };

  const handleRotate = () => {
    if (!selectedItemId) return;

    setPlacedItems((prev) =>
      prev.map((item) =>
        item.id === selectedItemId
          ? { ...item, rotation: (item.rotation + 90) % 360 }
          : item
      )
    );
    if (soundEnabled) soundManager.rotate();
    console.log('Rotated item');
  };

  const handleDelete = useCallback(() => {
    if (!selectedItemId) return;

    setPlacedItems((prev) => prev.filter((item) => item.id !== selectedItemId));
    setSelectedItemId(null);
    if (soundEnabled) soundManager.deletion();
    console.log('Deleted item');
  }, [selectedItemId, soundEnabled]);

  const handleSave = () => {
    saveGame(placedItems, resources);
    if (soundEnabled) soundManager.click();
    toast({
      title: 'Game Saved',
      description: 'Your Mars habitat has been saved successfully!',
    });
    console.log('Game saved to localStorage');
  };

  const handleClear = () => {
    setPlacedItems([]);
    setSelectedItemId(null);
    setSelectedItemType(null);
    if (soundEnabled) soundManager.deletion();
    toast({
      title: 'Habitat Cleared',
      description: 'All items have been removed.',
      variant: 'destructive',
    });
    console.log('All items cleared');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        handleRotate();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape') {
        setSelectedItemId(null);
        setSelectedItemType(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemId, handleDelete]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <div className="flex-shrink-0">
        <ResourceBar resources={resources} />
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 relative">
          <MarsCanvas
            placedItems={placedItems}
            selectedItemType={selectedItemType}
            selectedItemId={selectedItemId}
            onPlaceItem={handlePlaceItem}
            onSelectItem={handleSelectItem}
            onMoveItem={handleMoveItem}
          />

          <ControlBar
            onSave={handleSave}
            onClear={handleClear}
            onRotate={handleRotate}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
            hasSelection={selectedItemId !== null}
          />
        </div>

        <div className="flex-shrink-0">
          <InventoryPanel
            onItemSelect={handleItemSelect}
            selectedItemId={selectedItemType?.id || null}
          />
        </div>
      </div>

      <WelcomeModal open={showWelcome} onClose={() => setShowWelcome(false)} />
    </div>
  );
}
