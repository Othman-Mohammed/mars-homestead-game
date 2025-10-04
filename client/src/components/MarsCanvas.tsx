import { useRef, useEffect, useState, useCallback } from 'react';
import { PlacedItem, HabitatItemType } from '@/lib/gameTypes';
import GameTooltip from './GameTooltip';
import marsBackground from '@assets/generated_images/Mars_surface_terrain_background_80d4a954.png';

interface MarsCanvasProps {
  placedItems: PlacedItem[];
  selectedItemType: HabitatItemType | null;
  selectedItemId: string | null;
  onPlaceItem: (x: number, y: number) => void;
  onSelectItem: (itemId: string | null) => void;
  onMoveItem: (itemId: string, x: number, y: number) => void;
  zoom: number;
  gridSnap: boolean;
}

export default function MarsCanvas({
  placedItems,
  selectedItemType,
  selectedItemId,
  onPlaceItem,
  onSelectItem,
  onMoveItem,
  zoom,
  gridSnap,
}: MarsCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<{ item: HabitatItemType; x: number; y: number } | null>(null);

  const GRID_SIZE = 20;

  const snapToGrid = (value: number): number => {
    if (!gridSnap) return value;
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

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
      const placedX = snapToGrid(x - selectedItemType.width / 2);
      const placedY = snapToGrid(y - selectedItemType.height / 2);
      console.log('Placing item:', selectedItemType.name);
      onPlaceItem(placedX, placedY);
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

    const mouseX = (e.clientX - rect.left) / zoom;
    const mouseY = (e.clientY - rect.top) / zoom;

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
    const x = (e.clientX - rect.left) / zoom - dragOffset.x;
    const y = (e.clientY - rect.top) / zoom - dragOffset.y;

    const snappedX = snapToGrid(Math.max(0, x));
    const snappedY = snapToGrid(Math.max(0, y));

    onMoveItem(draggedItemId, snappedX, snappedY);
  }, [isDragging, draggedItemId, dragOffset, onMoveItem, zoom, gridSnap]);

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
        <div
          className="relative w-full h-full"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            width: `${100 / zoom}%`,
            height: `${100 / zoom}%`,
          }}
        >
          {gridSnap && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(200, 200, 200, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(200, 200, 200, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
              }}
            />
          )}

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
