import { useState } from 'react';
import InventoryPanel from '../InventoryPanel';
import { HabitatItemType } from '@/lib/gameTypes';

export default function InventoryPanelExample() {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  const handleItemSelect = (itemType: HabitatItemType) => {
    setSelectedItemId(itemType.id);
  };

  return (
    <div className="h-screen">
      <InventoryPanel 
        onItemSelect={handleItemSelect}
        selectedItemId={selectedItemId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
