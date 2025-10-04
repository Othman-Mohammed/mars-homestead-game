import StatisticsPanel from '../StatisticsPanel';
import { HABITAT_TYPES } from '@/lib/gameTypes';

export default function StatisticsPanelExample() {
  const placedItems = [
    { id: '1', type: HABITAT_TYPES.dome, x: 0, y: 0, rotation: 0 },
    { id: '2', type: HABITAT_TYPES.dome, x: 0, y: 0, rotation: 0 },
    { id: '3', type: HABITAT_TYPES.solar, x: 0, y: 0, rotation: 0 },
    { id: '4', type: HABITAT_TYPES.solar, x: 0, y: 0, rotation: 0 },
    { id: '5', type: HABITAT_TYPES.plant, x: 0, y: 0, rotation: 0 },
    { id: '6', type: HABITAT_TYPES.water, x: 0, y: 0, rotation: 0 },
  ];

  const resources = {
    oxygen: 65,
    power: 54,
    water: 47,
    food: 40,
  };

  return (
    <div className="p-8 bg-background">
      <StatisticsPanel placedItems={placedItems} resources={resources} />
    </div>
  );
}
