import domeIcon from '@assets/generated_images/Dome_habitat_module_icon_cb7c1db8.png';
import solarIcon from '@assets/generated_images/Solar_panel_module_icon_fe21d73e.png';
import bedIcon from '@assets/generated_images/Living_quarters_bed_icon_976b9053.png';
import plantIcon from '@assets/generated_images/Plant_greenhouse_pod_icon_f6fdd55d.png';
import waterIcon from '@assets/generated_images/Water_storage_tank_icon_561c592f.png';

export interface ResourceImpact {
  oxygen: number;
  power: number;
  water: number;
  food: number;
}

export interface HabitatItemType {
  id: string;
  name: string;
  icon: string;
  width: number;
  height: number;
  resourceImpact: ResourceImpact;
  description: string;
}

export interface PlacedItem {
  id: string;
  type: HabitatItemType;
  x: number;
  y: number;
  rotation: number;
}

export interface Resources {
  oxygen: number;
  power: number;
  water: number;
  food: number;
}

export const HABITAT_TYPES: Record<string, HabitatItemType> = {
  dome: {
    id: 'dome',
    name: 'Habitat Dome',
    icon: domeIcon,
    width: 120,
    height: 100,
    resourceImpact: {
      oxygen: 5,
      power: -10,
      water: 0,
      food: 0,
    },
    description: 'Living space for colonists. Provides oxygen, consumes power.',
  },
  solar: {
    id: 'solar',
    name: 'Solar Panel',
    icon: solarIcon,
    width: 80,
    height: 60,
    resourceImpact: {
      oxygen: 0,
      power: 25,
      water: 0,
      food: 0,
    },
    description: 'Generates power from sunlight. Essential for energy.',
  },
  bed: {
    id: 'bed',
    name: 'Living Quarters',
    icon: bedIcon,
    width: 60,
    height: 40,
    resourceImpact: {
      oxygen: -2,
      power: -5,
      water: -3,
      food: -5,
    },
    description: 'Sleeping quarters for crew. Consumes resources.',
  },
  plant: {
    id: 'plant',
    name: 'Plant Pod',
    icon: plantIcon,
    width: 50,
    height: 50,
    resourceImpact: {
      oxygen: 10,
      power: -8,
      water: -10,
      food: 15,
    },
    description: 'Grows food and produces oxygen. Needs water and power.',
  },
  water: {
    id: 'water',
    name: 'Water Tank',
    icon: waterIcon,
    width: 70,
    height: 80,
    resourceImpact: {
      oxygen: 0,
      power: -3,
      water: 20,
      food: 0,
    },
    description: 'Stores and purifies water. Slight power consumption.',
  },
};

export const INITIAL_RESOURCES: Resources = {
  oxygen: 50,
  power: 50,
  water: 50,
  food: 50,
};
