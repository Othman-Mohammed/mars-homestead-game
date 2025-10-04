import { Droplet, Zap, Wind, Apple } from 'lucide-react';
import { Resources } from '@/lib/gameTypes';

interface ResourceBarProps {
  resources: Resources;
}

export default function ResourceBar({ resources }: ResourceBarProps) {
  const resourceConfigs = [
    { key: 'oxygen' as keyof Resources, label: 'Oxygen', icon: Wind, color: 'chart-3', bgColor: 'bg-chart-3' },
    { key: 'power' as keyof Resources, label: 'Power', icon: Zap, color: 'chart-4', bgColor: 'bg-chart-4' },
    { key: 'water' as keyof Resources, label: 'Water', icon: Droplet, color: 'chart-5', bgColor: 'bg-chart-5' },
    { key: 'food' as keyof Resources, label: 'Food', icon: Apple, color: 'chart-2', bgColor: 'bg-chart-2' },
  ];

  return (
    <div 
      className="w-full bg-card/90 backdrop-blur-sm border-b border-card-border p-4"
      data-testid="resource-bar"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-4">
          {resourceConfigs.map(({ key, label, icon: Icon, color, bgColor }) => {
            const value = resources[key];
            const percentage = Math.max(0, Math.min(100, value));
            const isLow = percentage < 20;
            const isCritical = percentage < 10;

            return (
              <div 
                key={key} 
                className="space-y-2"
                data-testid={`resource-${key}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 text-${color}`} />
                    <span className="text-sm font-medium text-foreground">{label}</span>
                  </div>
                  <span 
                    className={`text-sm font-mono font-semibold ${
                      isCritical ? 'text-destructive animate-shake' : 
                      isLow ? 'text-chart-2' : 
                      'text-muted-foreground'
                    }`}
                    data-testid={`resource-value-${key}`}
                  >
                    {Math.round(value)}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${bgColor} transition-all duration-300 ease-out`}
                    style={{ width: `${percentage}%` }}
                    data-testid={`resource-bar-${key}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
