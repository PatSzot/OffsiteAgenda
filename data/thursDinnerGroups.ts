export interface ThursDinnerGroup {
  leader: string;
  members: string[];
  time?: string;
  location?: string;
  locationUrl?: string;
}

export const thursDinnerGroups: ThursDinnerGroup[] = [
  {
    leader: "Aayush",
    members: ["Kendalle", "Nick H", "JT", "Eric", "Alex", "Matt"],
    time: "7:30 PM",
  },
  {
    leader: "Lucas",
    members: ["Alex Viegas", "Arnav", "Beckett", "Charlie Blanz", "Gianna", "Nico Stanley", "Satchel Kim"],
    time: "7:30 PM",
    location: "Bairro do Avillez (Pateo)",
    locationUrl: "https://www.bairrodoavillez.pt/en/pateo/",
  },
  {
    leader: "Viet",
    members: ["Steph", "Danny", "Sarah"],
    time: "8:00 PM",
    location: "Doca de Santo",
    locationUrl: "https://docadesanto.com.pt/",
  },
  {
    leader: "Andreea",
    members: ["MJ", "Calvin", "Anton", "Elmi", "Clyde"],
    time: "7:30 PM",
    location: "Black Pavillion",
    locationUrl: "https://blackpavilion.com.pt/en/",
  },
  {
    leader: "Jess",
    members: ["Pat", "Cyris", "Aaron", "David Flowers", "Ini"],
    time: "7:30 PM",
    location: "Capitulo Restaurant & Bar",
    locationUrl: "https://capitulo.pt/en/",
  },
  {
    leader: "Melanie",
    members: ["Charles", "Arnett", "Shahbaz", "John Sellers", "Manu Sheen"],
  },
  {
    leader: "Bryan",
    members: ["Joel", "Jeremy", "Moses", "AJ", "Diana"],
    time: "7:30 PM",
    location: "Prado",
    locationUrl: "https://pradorestaurante.com/",
  },
  {
    leader: "Richard",
    members: ["Ryan", "Aaron", "Will", "Henry Young", "Nika Moore"],
    time: "7:30 PM",
    location: "Sud Lisboa Terrazza",
    locationUrl: "https://sudlisboa.com/en/sud-lisboa-terrazza-en/",
  },
  {
    leader: "Ali",
    members: ["Cindy", "Ashland", "Iccha"],
  },
  {
    leader: "Eoin",
    members: ["Oshen Davidson", "Julia Bracht", "Ben", "Katelyn", "Maria Anez"],
    time: "7:30 PM",
    location: "Leoneta",
  },
  {
    leader: "Ally",
    members: ["Josh Spilker", "Ally Rubin", "Jim Tan", "Gabrielle", "Terence", "Christy"],
    time: "7:45 PM",
    location: "Rosamar",
  },
];
