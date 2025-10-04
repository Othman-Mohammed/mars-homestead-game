import { HabitatItemType, HABITAT_TYPES } from '@/lib/gameTypes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface InventoryPanelProps {
  onItemSelect: (itemType: HabitatItemType) => void;
  selectedItemId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InventoryPanel({ onItemSelect, selectedItemId, isOpen, onClose }: InventoryPanelProps) {
  const items = Object.values(HABITAT_TYPES);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
          data-testid="inventory-overlay"
        />
      )}
      
      <div 
        className={`
          fixed lg:relative
          right-0 top-0 bottom-0
          w-80 sm:w-96 lg:w-80
          h-full bg-card/95 backdrop-blur-sm 
          border-l border-card-border 
          p-4 sm:p-6 overflow-y-auto
          z-40 lg:z-0
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
        data-testid="inventory-panel"
      >
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground tracking-wide mb-1">
                INVENTORY
              </h2>
              <div className="h-1 w-16 bg-primary rounded-full" />
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden"
              onClick={onClose}
              data-testid="button-close-inventory"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {items.map((item) => {
              const isSelected = selectedItemId === item.id;
              
              return (
                <Card
                  key={item.id}
                  className={`
                    relative cursor-pointer p-3 
                    transition-all duration-200
                    hover-elevate active-elevate-2
                    ${isSelected ? 'ring-2 ring-primary' : ''}
                  `}
                  onClick={() => {
                    console.log('Item selected:', item.name);
                    onItemSelect(item);
                  }}
                  data-testid={`inventory-item-${item.id}`}
                >
                  <div className="space-y-2">
                    <div className="aspect-square bg-muted/30 rounded-md flex items-center justify-center overflow-hidden">
                      <img 
                        src={item.icon} 
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                        draggable={false}
                      />
                    </div>
                    <div>
                      <h3 className="text-xs font-medium text-foreground text-center leading-tight">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="pt-4 space-y-3 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground">Instructions</h3>
            <div className="text-xs text-muted-foreground space-y-2 leading-relaxed">
              <p>• Click an item to select it</p>
              <p>• Click on the Mars surface to place</p>
              <p>• Drag items to move them</p>
              <p>• Click item and press R to rotate</p>
              <p>• Click item and press Delete to remove</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
