import { HabitatItemType } from '@/lib/gameTypes';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface GameTooltipProps {
  item: HabitatItemType;
  x: number;
  y: number;
}

export default function GameTooltip({ item, x, y }: GameTooltipProps) {
  const resources = [
    { key: 'oxygen', label: 'Oxygen', value: item.resourceImpact.oxygen },
    { key: 'power', label: 'Power', value: item.resourceImpact.power },
    { key: 'water', label: 'Water', value: item.resourceImpact.water },
    { key: 'food', label: 'Food', value: item.resourceImpact.food },
  ];

  return (
    <div
      className="fixed pointer-events-none z-50 animate-in fade-in duration-200"
      style={{
        left: `${x + 20}px`,
        top: `${y - 10}px`,
      }}
      data-testid="game-tooltip"
    >
      <div className="bg-card/95 backdrop-blur-sm border-2 border-primary rounded-md p-4 shadow-lg max-w-xs">
        <h3 className="font-semibold text-foreground mb-2">{item.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
        
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-foreground">Resource Impact:</p>
          {resources.map(({ key, label, value }) => {
            if (value === 0) return null;
            
            const isPositive = value > 0;
            const Icon = isPositive ? TrendingUp : TrendingDown;
            
            return (
              <div key={key} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{label}:</span>
                <span className={`flex items-center gap-1 font-mono ${
                  isPositive ? 'text-chart-3' : 'text-destructive'
                }`}>
                  <Icon className="w-3 h-3" />
                  {isPositive ? '+' : ''}{value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div 
        className="absolute -top-2 left-4 w-3 h-3 bg-primary rotate-45 border-t-2 border-l-2 border-primary"
      />
    </div>
  );
}
