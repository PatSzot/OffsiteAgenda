export type SessionType =
  | "keynote"
  | "talk"
  | "workshop"
  | "panel"
  | "break"
  | "meal"
  | "social"
  | "travel";

export interface Speaker {
  name: string;
  title?: string;
  avatar?: string;
}

export interface Session {
  id: string;
  time: string;
  endTime?: string;
  title: string;
  description?: string;
  type: SessionType;
  speakers?: Speaker[];
  location?: string;
  highlight?: boolean;
}

export interface Day {
  id: string;
  label: string;
  date: string;
  theme?: string;
  note?: string;
  caution?: string;
  location?: string;
  sessions: Session[];
}

export interface Agenda {
  eventName: string;
  dates: string;
  location: string;
  days: Day[];
}

export const agenda: Agenda = {
  eventName: "AirOps Lisbon Offsite 2026",
  dates: "April 22–26, 2026",
  location: "Lisbon, Portugal",
  days: [
    {
      id: "wed",
      label: "Wednesday",
      date: "April 22",
      theme: "Arrivals",
      location: "Lisbon Marriott Hotel",
      sessions: [
        {
          id: "wed-arrivals",
          time: "All day",
          title: "Arrivals",
          description:
            "Fly into Lisbon Airport (LIS). Uber/Bolt is ~15–25 min to the hotel. Remember to expense your airport transfer.",
          type: "travel",
        },
        {
          id: "wed-checkin",
          time: "4:00 PM",
          title: "Hotel Check-In",
          type: "break",
          location: "Lisbon Marriott Hotel",
        },
        {
          id: "wed-welcome",
          time: "7:00 PM",
          endTime: "9:00 PM",
          title: "Welcome Party",
          description: "Light bites and drinks to kick off the offsite.",
          type: "social",
          highlight: true,
          location: "Lisbon Marriott Hotel Garden",
        },
      ],
    },
    {
      id: "thu",
      label: "Thursday",
      date: "April 23",
      theme: "Full Offsite Day",
      location: "MAAT – Museum of Art, Architecture and Technology",
      sessions: [
        {
          id: "thu-bus",
          time: "8:00 AM",
          title: "Bus Departure to MAAT",
          description:
            "Be at the bus by 8:00 AM for check-in. Departure at 8:15 AM. Everyone must be on the bus — no separate transport.",
          type: "travel",
          highlight: true,
        },
        {
          id: "thu-offsite",
          time: "9:00 AM",
          endTime: "6:00 PM",
          title: "Full Offsite Day",
          description:
            "A full day focused on building relationships, being present, and team connection. No laptops — this is intentional.",
          type: "keynote",
          highlight: true,
          location: "MAAT – Museum of Art, Architecture and Technology",
        },
        {
          id: "thu-bus-return",
          time: "6:15 PM",
          title: "Bus Return to Hotel",
          description:
            "Load up and check in at 6:15 PM. Departure back to hotel at 6:30 PM. Everyone must be on the bus.",
          type: "travel",
          highlight: true,
        },
        {
          id: "thu-dinner",
          time: "Evening",
          title: "Dinner with Direct Teams",
          description:
            "Dinner in your direct team group. Select your leader below to see your group and restaurant.",
          type: "meal",
          highlight: true,
        },
      ],
    },
    {
      id: "fri",
      label: "Friday",
      date: "April 24",
      theme: "Surprise Day 👀",
      location: "Lisbon Marriott Hotel",
      sessions: [
        {
          id: "fri-surprise",
          time: "All day",
          title: "Surprise Day",
          description:
            "More details to come. Make sure your laptop is fully charged — extension cords will be available but don't rely on them.",
          type: "keynote",
          highlight: true,
          location: "Lisbon Marriott Hotel",
        },
        {
          id: "fri-dinner",
          time: "Evening",
          title: "Dinner with Mixed Groups",
          description: "Dinner in mixed team groups. Groups coming soon.",
          type: "meal",
          highlight: true,
        },
      ],
    },
    {
      id: "sat",
      label: "Saturday",
      date: "April 25",
      theme: "Freedom Day 🇵🇹",
      note: "Portugal's national holiday celebrating the end of dictatorship and the start of democracy. The vibe: celebratory, patriotic, and lively across the city. Getting around: expect traffic delays — plan extra buffer time. What's open: restaurants and tourist areas mostly open; some shops may have reduced hours. Overall: a very cool day to be in Lisbon — just plan ahead.",
      caution: "⚠️ CAUTION: Be careful when riding bikes. Only ride down by the river — anywhere else is a near-death experience.",
      sessions: [
        {
          id: "sat-activity",
          time: "Daytime",
          title: "Optional AirOps Activity",
          description:
            "AirOps Flavortown-style fun. No assigned groups — mix and explore with whoever you'd like. More details coming soon.",
          type: "social",
          highlight: true,
        },
        {
          id: "sat-bus",
          time: "4:45 PM",
          title: "Bus to Send-Off Party",
          description:
            "Check-in 4:45–5:00 PM. Departure at 5:15 PM. Everyone must be on the bus — no separate transportation.",
          type: "travel",
          highlight: true,
        },
        {
          id: "sat-sendoff",
          time: "6:00 PM",
          title: "Send-Off Party",
          description: "Celebrate the end of the offsite. Spouses and guests welcome.",
          type: "social",
          highlight: true,
        },
      ],
    },
    {
      id: "sun",
      label: "Sunday",
      date: "April 26",
      theme: "Departures",
      sessions: [
        {
          id: "sun-checkout",
          time: "12:00 PM",
          title: "Hotel Check-Out",
          type: "break",
          location: "Lisbon Marriott Hotel",
        },
        {
          id: "sun-departures",
          time: "All day",
          title: "Departures",
          description:
            "Safe travels! Fly out from Lisbon Airport (LIS). Remember to expense your airport Uber.",
          type: "travel",
        },
      ],
    },
  ],
};
