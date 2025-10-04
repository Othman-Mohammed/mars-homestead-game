import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, X } from 'lucide-react';
import { PlacedItem, Resources } from '@/lib/gameTypes';

interface StatisticsPanelProps {
  placedItems: PlacedItem[];
  resources: Resources;
  isOpen: boolean;
  onClose: () => void;
}

export default function StatisticsPanel({ placedItems, resources, isOpen, onClose }: StatisticsPanelProps) {
  const moduleCount = placedItems.length;
  
  const itemCounts = placedItems.reduce((acc, item) => {
    acc[item.type.name] = (acc[item.type.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const avgResource = Math.round(
    (resources.oxygen + resources.power + resources.water + resources.food) / 4
  );

  const sustainability = avgResource >= 50 ? 'Excellent' : avgResource >= 30 ? 'Good' : avgResource >= 15 ? 'Fair' : 'Critical';
  const sustainabilityColor = avgResource >= 50 ? 'text-chart-3' : avgResource >= 30 ? 'text-chart-4' : avgResource >= 15 ? 'text-chart-2' : 'text-destructive';

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        onClick={onClose}
        data-testid="statistics-overlay"
      />
      
      <Card 
        className="fixed lg:absolute top-20 left-4 lg:top-6 lg:left-6 z-40 lg:z-20 w-72 sm:w-80 lg:w-64 p-4 space-y-4 shadow-lg" 
        data-testid="statistics-panel"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold text-foreground">Colony Stats</h3>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden h-6 w-6"
            onClick={onClose}
            data-testid="button-close-statistics"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Total Modules</div>
            <div className="text-2xl font-mono font-bold text-foreground" data-testid="stat-total-modules">
              {moduleCount}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Sustainability</div>
            <div className={`text-lg font-semibold ${sustainabilityColor}`} data-testid="stat-sustainability">
              {sustainability}
            </div>
          </div>
        </div>

        {moduleCount > 0 && (
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="text-xs font-medium text-foreground">Module Breakdown:</div>
            <div className="space-y-1.5">
              {Object.entries(itemCounts).map(([name, count]) => (
                <div key={name} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{name}</span>
                  <span className="font-mono text-foreground">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {moduleCount === 0 && (
          <div className="text-xs text-muted-foreground text-center py-4 border-t border-border">
            Start building your Mars base to see statistics!
          </div>
        )}
      </Card>
    </>
  );
}
