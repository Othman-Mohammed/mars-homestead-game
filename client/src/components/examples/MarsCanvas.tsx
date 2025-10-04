import { useState } from 'react';
import MarsCanvas from '../MarsCanvas';
import { PlacedItem, HABITAT_TYPES } from '@/lib/gameTypes';

export default function MarsCanvasExample() {
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([
    {
      id: '1',
      type: HABITAT_TYPES.dome,
      x: 200,
      y: 150,
      rotation: 0,
    },
    {
      id: '2',
      type: HABITAT_TYPES.solar,
      x: 400,
      y: 200,
      rotation: 0,
    },
    {
      id: '3',
      type: HABITAT_TYPES.plant,
      x: 300,
      y: 350,
      rotation: 0,
    },
  ]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleMoveItem = (itemId: string, x: number, y: number) => {
    setPlacedItems((items) =>
      items.map((item) => (item.id === itemId ? { ...item, x, y } : item))
    );
  };

  return (
    <div className="h-screen">
      <MarsCanvas
        placedItems={placedItems}
        selectedItemType={null}
        selectedItemId={selectedItemId}
        onPlaceItem={() => {}}
        onSelectItem={setSelectedItemId}
        onMoveItem={handleMoveItem}
        zoom={1}
        gridSnap={false}
      />
    </div>
  );
}
