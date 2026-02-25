// ─── Agenda Data ─────────────────────────────────────────────────────────────
// Fill in sessions as the agenda comes together.
// Each day can have any number of sessions. Sessions can be optional (breaks,
// meals, social) and can include a speaker and/or location override.

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
  avatar?: string; // path relative to /public
}

export interface Session {
  id: string;
  time: string;         // e.g. "09:00"
  endTime?: string;     // e.g. "09:45"
  title: string;
  description?: string;
  type: SessionType;
  speakers?: Speaker[];
  location?: string;    // overrides day-level location
  highlight?: boolean;  // render with extra visual weight
}

export interface Day {
  id: string;
  label: string;        // e.g. "Day 1"
  date: string;         // e.g. "Monday, March 9"
  location?: string;    // default location for the day
  theme?: string;       // optional day theme / subtitle
  sessions: Session[];
}

export interface AgendaConfig {
  eventName: string;
  tagline: string;
  dates: string;
  location: string;
  city: string;
  days: Day[];
}

// ─────────────────────────────────────────────────────────────────────────────

export const agenda: AgendaConfig = {
  eventName: "AirOps Lisbon 2026",
  tagline: "Together in Lisbon",
  dates: "April 22–26, 2026",
  location: "Lisbon, Portugal",
  city: "Lisbon",

  days: [
    {
      id: "day-1",
      label: "Wednesday",
      date: "April 22",
      location: "TBD",
      theme: "Arrival & Welcome Dinner",
      sessions: [
        {
          id: "d1-arrival",
          time: "TBD",
          title: "Arrivals & Check-in",
          type: "travel",
          highlight: false,
        },
        {
          id: "d1-dinner",
          time: "TBD",
          title: "Welcome Dinner",
          description: "Arrival dinner to kick off the offsite.",
          type: "meal",
          highlight: true,
          location: "TBD",
        },
      ],
    },
    {
      id: "day-2",
      label: "Thursday",
      date: "April 23",
      location: "TBD",
      theme: "Strategy & Connection",
      sessions: [
        {
          id: "d2-breakfast",
          time: "TBD",
          title: "Breakfast",
          type: "meal",
        },
        {
          id: "d2-morning",
          time: "TBD",
          title: "Morning Sessions",
          description: "Coming soon.",
          type: "talk",
          highlight: true,
        },
        {
          id: "d2-lunch",
          time: "TBD",
          title: "Lunch",
          type: "meal",
        },
        {
          id: "d2-afternoon",
          time: "TBD",
          title: "Afternoon Sessions",
          description: "Coming soon.",
          type: "workshop",
        },
        {
          id: "d2-social",
          time: "TBD",
          title: "Evening Activity",
          description: "Coming soon.",
          type: "social",
          highlight: true,
          location: "TBD",
        },
      ],
    },
    {
      id: "day-3",
      label: "Friday",
      date: "April 24",
      location: "TBD",
      theme: "Coming Soon",
      sessions: [
        {
          id: "d3-breakfast",
          time: "TBD",
          title: "Breakfast",
          type: "meal",
        },
        {
          id: "d3-morning",
          time: "TBD",
          title: "Morning Sessions",
          description: "Coming soon.",
          type: "talk",
          highlight: true,
        },
        {
          id: "d3-lunch",
          time: "TBD",
          title: "Lunch",
          type: "meal",
        },
        {
          id: "d3-afternoon",
          time: "TBD",
          title: "Afternoon Sessions",
          description: "Coming soon.",
          type: "workshop",
        },
        {
          id: "d3-social",
          time: "TBD",
          title: "Evening Activity",
          description: "Coming soon.",
          type: "social",
          highlight: true,
          location: "TBD",
        },
      ],
    },
    {
      id: "day-4",
      label: "Saturday",
      date: "April 25",
      location: "TBD",
      theme: "Coming Soon",
      sessions: [
        {
          id: "d4-breakfast",
          time: "TBD",
          title: "Breakfast",
          type: "meal",
        },
        {
          id: "d4-morning",
          time: "TBD",
          title: "Morning Sessions",
          description: "Coming soon.",
          type: "talk",
          highlight: true,
        },
        {
          id: "d4-lunch",
          time: "TBD",
          title: "Lunch",
          type: "meal",
        },
        {
          id: "d4-afternoon",
          time: "TBD",
          title: "Afternoon Sessions",
          description: "Coming soon.",
          type: "workshop",
        },
        {
          id: "d4-social",
          time: "TBD",
          title: "Evening Activity",
          description: "Coming soon.",
          type: "social",
          highlight: true,
          location: "TBD",
        },
      ],
    },
    {
      id: "day-5",
      label: "Sunday",
      date: "April 26",
      location: "TBD",
      theme: "Send-off & Departures",
      sessions: [
        {
          id: "d5-breakfast",
          time: "TBD",
          title: "Breakfast",
          type: "meal",
        },
        {
          id: "d5-sendoff",
          time: "TBD",
          title: "Send-off Party",
          description: "A final celebration before everyone heads home.",
          type: "social",
          highlight: true,
          location: "TBD",
        },
        {
          id: "d5-departures",
          time: "TBD",
          title: "Departures",
          type: "travel",
        },
      ],
    },
  ],
};
