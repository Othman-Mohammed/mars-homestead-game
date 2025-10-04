import ResourceBar from '../ResourceBar';

export default function ResourceBarExample() {
  const resources = {
    oxygen: 75,
    power: 45,
    water: 60,
    food: 15,
  };

  return <ResourceBar resources={resources} />;
}
