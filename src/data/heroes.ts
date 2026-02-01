export type HeroRole = 'Vanguard' | 'Duelist' | 'Strategist';

export interface Hero {
  id: string;
  name: string;
  role: HeroRole;
  image: string;
}

export const heroes: Hero[] = [
  // Vanguards
  { id: 'captain-america', name: 'Captain America', role: 'Vanguard', image: '/heroes/Captain America.jpg' },
  { id: 'dr-strange', name: 'Dr Strange', role: 'Vanguard', image: '/heroes/Dr Strange.jpg' },
  { id: 'emma-frost', name: 'Emma Frost', role: 'Vanguard', image: '/heroes/Emma Frost.jpg' },
  { id: 'groot', name: 'Groot', role: 'Vanguard', image: '/heroes/Groot.jpg' },
  { id: 'hulk', name: 'Hulk', role: 'Vanguard', image: '/heroes/Hulk.jpg' },
  { id: 'magneto', name: 'Magneto', role: 'Vanguard', image: '/heroes/Magneto.jpg' },
  { id: 'penny-parker', name: 'Penny Parker', role: 'Vanguard', image: '/heroes/Penny parker.jpg' },
  { id: 'the-thing', name: 'The Thing', role: 'Vanguard', image: '/heroes/The Thing.jpg' },
  { id: 'thor', name: 'Thor', role: 'Vanguard', image: '/heroes/Thor.jpg' },
  { id: 'venom', name: 'Venom', role: 'Vanguard', image: '/heroes/Venom.jpg' },
  { id: 'angela', name: 'Angela', role: 'Vanguard', image: '/heroes/Angela.jpg' },

  // Duelists
  { id: 'black-panther', name: 'Black Panther', role: 'Duelist', image: '/heroes/Black Panther.jpg' },
  { id: 'black-widow', name: 'Black Widow', role: 'Duelist', image: '/heroes/Black Widow.jpg' },
  { id: 'blade', name: 'Blade', role: 'Duelist', image: '/heroes/Blade.jpg' },
  { id: 'daredevil', name: 'DareDevil', role: 'Duelist', image: '/heroes/DareDevil.jpg' },
  { id: 'deadpool', name: 'Deadpool', role: 'Duelist', image: '/heroes/Deadpool.jpg' },
  { id: 'gambit', name: 'Gambit', role: 'Strategist', image: '/heroes/Gambit.jpg' },
  { id: 'hawkeye', name: 'Hawkeye', role: 'Duelist', image: '/heroes/Hawkeye.jpg' },
  { id: 'hela', name: 'Hela', role: 'Duelist', image: '/heroes/Hela.jpg' },
  { id: 'human-torch', name: 'Human Torch', role: 'Duelist', image: '/heroes/Human Torch.jpg' },
  { id: 'iron-fist', name: 'Iron Fist', role: 'Duelist', image: '/heroes/Iron FIst.jpg' }, // Note: Iron FIst.jpg (capital I) based on ls output
  { id: 'ironman', name: 'Iron Man', role: 'Duelist', image: '/heroes/Ironman.jpg' },
  { id: 'magik', name: 'Magik', role: 'Duelist', image: '/heroes/Magik.jpg' },
  { id: 'moon-knight', name: 'Moon Knight', role: 'Duelist', image: '/heroes/Moonknight.jpg' },
  { id: 'namor', name: 'Namor', role: 'Duelist', image: '/heroes/Namor.jpg' },
  { id: 'punisher', name: 'The Punisher', role: 'Duelist', image: '/heroes/Punisher.jpg' },
  { id: 'psylocke', name: 'Psylocke', role: 'Duelist', image: '/heroes/Psyloke.jpg' }, // Note: Psyloke.jpg spelling
  { id: 'scarlet-witch', name: 'Scarlet Witch', role: 'Duelist', image: '/heroes/Scarlet Witch.jpg' },
  { id: 'spiderman', name: 'Spider-Man', role: 'Duelist', image: '/heroes/Spiderman.jpg' },
  { id: 'squirrel-girl', name: 'Squirrel Girl', role: 'Duelist', image: '/heroes/Squirrel Girl.jpg' },
  { id: 'starlord', name: 'Star-Lord', role: 'Duelist', image: '/heroes/Starlord.jpg' },
  { id: 'storm', name: 'Storm', role: 'Duelist', image: '/heroes/Storm.jpg' },
  { id: 'winter-soldier', name: 'Winter Soldier', role: 'Duelist', image: '/heroes/Winter Soldier.jpg' },
  { id: 'wolverine', name: 'Wolverine', role: 'Duelist', image: '/heroes/Wolverine.jpg' },

  // Strategists
  { id: 'adam-warlock', name: 'Adam Warlock', role: 'Strategist', image: '/heroes/Adam.jpg' },
  { id: 'cloak-dagger', name: 'Cloak & Dagger', role: 'Strategist', image: '/heroes/Cloak and Dagger.jpg' },
  { id: 'invisible-woman', name: 'Invisible Woman', role: 'Strategist', image: '/heroes/Invisible Woman.jpg' },
  { id: 'jeff', name: 'Jeff', role: 'Strategist', image: '/heroes/Jeff the Land Shark.jpg' },
  { id: 'loki', name: 'Loki', role: 'Strategist', image: '/heroes/Loki.jpg' },
  { id: 'luna-snow', name: 'Luna Snow', role: 'Strategist', image: '/heroes/Luna.jpg' },
  { id: 'mantis', name: 'Mantis', role: 'Strategist', image: '/heroes/Mantis.jpg' },
  { id: 'rocket', name: 'Rocket Raccoon', role: 'Strategist', image: '/heroes/Rocket Racoon.jpg' },
  { id: 'ultron', name: 'Ultron', role: 'Strategist', image: '/heroes/Ultron.jpg' },
];
