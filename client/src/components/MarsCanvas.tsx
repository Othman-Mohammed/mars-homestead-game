import { useRef, useEffect, useState, useCallback } from 'react';
import { PlacedItem, HabitatItemType, Resources } from '@/lib/gameTypes';
import GameTooltip from './GameTooltip';
import marsBackground from '@assets/generated_images/Mars_surface_terrain_background_80d4a954.png';

interface MarsCanvasProps {
  placedItems: PlacedItem[];
  selectedItemType: HabitatItemType | null;
  selectedItemId: string | null;
  onPlaceItem: (x: number, y: number) => void;
  onSelectItem: (itemId: string | null) => void;
  onMoveItem: (itemId: string, x: number, y: number) => void;
}

export default function MarsCanvas({
  placedItems,
  selectedItemType,
  selectedItemId,
  onPlaceItem,
  onSelectItem,
  onMoveItem,
}: MarsCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<{ item: HabitatItemType; x: number; y: number } | null>(null);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedItem = placedItems.find((item) => {
      return (
        x >= item.x &&
        x <= item.x + item.type.width &&
        y >= item.y &&
        y <= item.y + item.type.height
      );
    });

    if (clickedItem) {
      console.log('Item selected:', clickedItem.type.name);
      onSelectItem(clickedItem.id);
    } else if (selectedItemType) {
      console.log('Placing item:', selectedItemType.name);
      onPlaceItem(x - selectedItemType.width / 2, y - selectedItemType.height / 2);
    } else {
      onSelectItem(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, itemId: string) => {
    e.stopPropagation();
    const item = placedItems.find((i) => i.id === itemId);
    if (!item) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setDraggedItemId(itemId);
    setIsDragging(true);
    setDragOffset({
      x: mouseX - item.x,
      y: mouseY - item.y,
    });
    onSelectItem(itemId);
    console.log('Started dragging:', item.type.name);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !draggedItemId || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;

    onMoveItem(draggedItemId, Math.max(0, x), Math.max(0, y));
  }, [isDragging, draggedItemId, dragOffset, onMoveItem]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      console.log('Stopped dragging');
      setIsDragging(false);
      setDraggedItemId(null);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleItemMouseEnter = (item: PlacedItem, e: React.MouseEvent) => {
    if (!isDragging) {
      setHoveredItem({
        item: item.type,
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleItemMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleItemMouseMove = (e: React.MouseEvent) => {
    if (hoveredItem) {
      setHoveredItem({
        ...hoveredItem,
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  return (
    <>
      <div
        ref={canvasRef}
        className="relative w-full h-full overflow-hidden cursor-crosshair"
        onClick={handleCanvasClick}
        style={{
          backgroundImage: `url(${marsBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        data-testid="mars-canvas"
      >
        {placedItems.map((item) => {
          const isSelected = item.id === selectedItemId;
          const rotation = item.rotation || 0;

          return (
            <div
              key={item.id}
              className={`absolute cursor-move select-none transition-all duration-200 ${
                isSelected ? 'ring-2 ring-primary animate-pulse-glow' : ''
              } ${isDragging && draggedItemId === item.id ? 'opacity-70 scale-105' : ''}`}
              style={{
                left: `${item.x}px`,
                top: `${item.y}px`,
                width: `${item.type.width}px`,
                height: `${item.type.height}px`,
                transform: `rotate(${rotation}deg)`,
                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))',
              }}
              onMouseDown={(e) => handleMouseDown(e, item.id)}
              onMouseEnter={(e) => handleItemMouseEnter(item, e)}
              onMouseLeave={handleItemMouseLeave}
              onMouseMove={handleItemMouseMove}
              data-testid={`placed-item-${item.id}`}
            >
              <img
                src={item.type.icon}
                alt={item.type.name}
                className="w-full h-full object-contain pointer-events-none"
                draggable={false}
              />
            </div>
          );
        })}

        {selectedItemType && !isDragging && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-primary/5" />
          </div>
        )}
      </div>

      {hoveredItem && (
        <GameTooltip
          item={hoveredItem.item}
          x={hoveredItem.x}
          y={hoveredItem.y}
        />
      )}
    </>
  );
}
