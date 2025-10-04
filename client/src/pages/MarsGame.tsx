import { useState, useEffect, useCallback, useRef } from 'react';
import { PlacedItem, HabitatItemType, Resources, INITIAL_RESOURCES } from '@/lib/gameTypes';
import { soundManager } from '@/lib/soundEffects';
import { saveGame, loadGame } from '@/lib/gameStorage';
import { GameHistory } from '@/lib/gameHistory';
import ResourceBar from '@/components/ResourceBar';
import InventoryPanel from '@/components/InventoryPanel';
import MarsCanvas from '@/components/MarsCanvas';
import ControlBar from '@/components/ControlBar';
import WelcomeModal from '@/components/WelcomeModal';
import ZoomControls from '@/components/ZoomControls';
import StatisticsPanel from '@/components/StatisticsPanel';
import { useToast } from '@/hooks/use-toast';

export default function MarsGame() {
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [resources, setResources] = useState<Resources>(INITIAL_RESOURCES);
  const [selectedItemType, setSelectedItemType] = useState<HabitatItemType | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [gridSnap, setGridSnap] = useState(true);
  const { toast } = useToast();
  
  const historyRef = useRef(new GameHistory());
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

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
      historyRef.current.pushState(savedData.placedItems);
      console.log('Game loaded from localStorage');
    } else {
      historyRef.current.pushState([]);
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

  useEffect(() => {
    if (autoSaveTimerRef.current) {
      clearInterval(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setInterval(() => {
      if (placedItems.length > 0) {
        saveGame(placedItems, resources);
        console.log('Auto-saved game');
      }
    }, 30000);

    return () => {
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current);
      }
    };
  }, [placedItems, resources]);

  const updatePlacedItems = useCallback((newItems: PlacedItem[]) => {
    setPlacedItems(newItems);
    historyRef.current.pushState(newItems);
    setCanUndo(historyRef.current.canUndo());
    setCanRedo(historyRef.current.canRedo());
  }, []);

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

    updatePlacedItems([...placedItems, newItem]);
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

    const newItems = placedItems.map((item) =>
      item.id === selectedItemId
        ? { ...item, rotation: (item.rotation + 90) % 360 }
        : item
    );
    updatePlacedItems(newItems);
    if (soundEnabled) soundManager.rotate();
    console.log('Rotated item');
  };

  const handleDelete = useCallback(() => {
    if (!selectedItemId) return;

    const newItems = placedItems.filter((item) => item.id !== selectedItemId);
    updatePlacedItems(newItems);
    setSelectedItemId(null);
    if (soundEnabled) soundManager.deletion();
    console.log('Deleted item');
  }, [selectedItemId, placedItems, soundEnabled, updatePlacedItems]);

  const handleUndo = () => {
    const previousState = historyRef.current.undo();
    if (previousState !== null) {
      setPlacedItems(previousState);
      setSelectedItemId(null);
      setCanUndo(historyRef.current.canUndo());
      setCanRedo(historyRef.current.canRedo());
      if (soundEnabled) soundManager.click();
      console.log('Undo');
    }
  };

  const handleRedo = () => {
    const nextState = historyRef.current.redo();
    if (nextState !== null) {
      setPlacedItems(nextState);
      setSelectedItemId(null);
      setCanUndo(historyRef.current.canUndo());
      setCanRedo(historyRef.current.canRedo());
      if (soundEnabled) soundManager.click();
      console.log('Redo');
    }
  };

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
    updatePlacedItems([]);
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

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(1.5, prev + 0.1));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(0.5, prev - 0.1));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        handleRedo();
      } else if (e.key === 'r' || e.key === 'R') {
        handleRotate();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape') {
        setSelectedItemId(null);
        setSelectedItemType(null);
      } else if (e.key === 'g' || e.key === 'G') {
        setGridSnap((prev) => !prev);
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
            zoom={zoom}
            gridSnap={gridSnap}
          />

          <ZoomControls
            zoom={zoom}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={handleResetZoom}
          />

          <div className="absolute top-6 left-6 z-20 w-64">
            <StatisticsPanel placedItems={placedItems} resources={resources} />
          </div>

          <ControlBar
            onSave={handleSave}
            onClear={handleClear}
            onRotate={handleRotate}
            onUndo={handleUndo}
            onRedo={handleRedo}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
            gridSnap={gridSnap}
            onToggleGrid={() => setGridSnap(!gridSnap)}
            hasSelection={selectedItemId !== null}
            canUndo={canUndo}
            canRedo={canRedo}
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
