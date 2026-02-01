export type GameMode = 'Convergence' | 'Domination' | 'Convoy';

export interface MapInfo {
  id: string;
  name: string;
  region: string;
  mode: GameMode;
  image?: string;
}

export const maps: MapInfo[] = [
  // Convergence
  { 
    id: 'central-park', 
    name: 'Central Park', 
    region: 'Empire Of Eternal Night', 
    mode: 'Convergence',
    image: '/maps/Convergence/centralpark.webp'
  },
  { 
    id: 'hall-of-djalia', 
    name: 'Hall of Djalia', 
    region: 'Intergalactic Empire of Wakanda', 
    mode: 'Convergence' 
  },
  { 
    id: 'symbiotic-surface', 
    name: 'Symbiotic Surface', 
    region: 'Klyntar', 
    mode: 'Convergence' 
  },
  { 
    id: 'heart-of-heaven', 
    name: 'Heart of Heaven', 
    region: "K'un Lun", 
    mode: 'Convergence' 
  },
  // Note: 'tokyo2099.webp' was found in Convergence folder but 'Spider-Islands' (Tokyo 2099) is listed under Convoy in previous data. 
  // Assuming 'Spider-Islands' might be the intended match or a new Convergence map 'Tokyo 2099' is needed. 
  // For now, I'll not assign it to a random map to avoid confusion unless specified.

  // Domination
  { 
    id: 'krakoa', 
    name: 'Krakoa', 
    region: 'Hellfire Gala', 
    mode: 'Domination' 
  },
  { 
    id: 'hells-heaven', 
    name: 'Hell’s Heaven', 
    region: 'Hydra Charteris Base', 
    mode: 'Domination',
    image: '/maps/Domination/hydradom.jpg'
  },
  { 
    id: 'birnin-tchalla', 
    name: 'Birnin T’Challa', 
    region: 'Intergalactic Empire of Wakanda', 
    mode: 'Domination' 
  },
  { 
    id: 'celestial-husk', 
    name: 'Celestial Husk', 
    region: 'Klyntar', 
    mode: 'Domination' 
  },
  { 
    id: 'royal-palace', 
    name: 'Royal Palace', 
    region: 'Yggsgard', 
    mode: 'Domination',
    image: '/maps/Domination/bifrostgardendom.jpg' // Best guess based on folder location
  },

  // Convoy
  { 
    id: 'arakko', 
    name: 'Arakko', 
    region: 'Arakko', 
    mode: 'Convoy' 
  },
  { 
    id: 'midtown', 
    name: 'Midtown', 
    region: 'Empire Of Eternal Night', 
    mode: 'Convoy',
    image: '/maps/Convoy/Midtown.jpg'
  },
  { 
    id: 'spider-islands', 
    name: 'Spider-Islands', 
    region: 'Tokyo 2099', 
    mode: 'Convoy',
    image: '/maps/Convoy/Tokyo2099convoy.jpg'
  },
  { 
    id: 'yggdrasill-path', 
    name: 'Yggdrasill Path', 
    region: 'Yggsgard', 
    mode: 'Convoy',
    image: '/maps/Convoy/Yggdrasilconvoy.webp'
  },
  { 
    id: 'museum-of-contemplation', 
    name: 'Museum of Contemplation', 
    region: 'Unknown', 
    mode: 'Convoy' 
  },
];
