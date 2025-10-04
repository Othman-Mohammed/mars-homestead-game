import GameTooltip from '../GameTooltip';
import { HABITAT_TYPES } from '@/lib/gameTypes';

export default function GameTooltipExample() {
  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <GameTooltip 
        item={HABITAT_TYPES.dome}
        x={400}
        y={300}
      />
    </div>
  );
}
