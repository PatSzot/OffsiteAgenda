import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { agenda } from "@/data/agenda";
import { dinnerGroups } from "@/data/dinnerGroups";

// ─── Fonts ────────────────────────────────────────────────────────────────────
Font.register({
  family: "Saans",
  fonts: [
    { src: "/fonts/Saans-Regular.ttf", fontWeight: 500 },
    { src: "/fonts/Saans-Medium.ttf",  fontWeight: 500 },
    { src: "/fonts/Saans-Bold.ttf",    fontWeight: 700 },
  ],
});
Font.register({
  family: "SaansMono",
  src: "/fonts/SaansMono-Medium.ttf",
  fontWeight: 500,
});
Font.register({
  family: "Serrif",
  src: "/fonts/SerrifVF.ttf",
  fontWeight: 500,
});

// ─── Strip emojis ─────────────────────────────────────────────────────────────
function strip(text: string): string {
  return text
    .replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}]/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const C = {
  cobalt:   "#1B1DB5",
  lavender: "#EAEAF5",
  lavDark:  "#D8D8EE",
  indigo:   "#2323A5",
  white:    "#FFFFFF",
};

const s = StyleSheet.create({
  coverPage:    { backgroundColor: C.cobalt, flexDirection: "column", justifyContent: "flex-end", paddingHorizontal: 36, paddingVertical: 36 },
  contentPage:  { backgroundColor: C.lavender, padding: 0 },

  coverLogo:    { width: 420 },
  coverDates:   { fontFamily: "Serrif", fontSize: 44, color: C.white, marginBottom: 10 },
  coverMeta:    { fontFamily: "SaansMono", fontSize: 11, color: "#FFFFFF60", letterSpacing: 1.5, textTransform: "uppercase" },

  sectionBar:   { backgroundColor: C.cobalt, paddingHorizontal: 36, paddingVertical: 22 },
  sectionTitle: { fontFamily: "Serrif", fontSize: 32, color: C.white },

  dayHeader:    { paddingHorizontal: 36, paddingTop: 24, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: C.lavDark, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  dayLabel:     { fontFamily: "SaansMono", fontSize: 10, color: C.cobalt, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 5 },
  dayTheme:     { fontFamily: "Serrif", fontSize: 24, color: C.indigo, lineHeight: 1.1 },
  dayLocation:  { fontFamily: "SaansMono", fontSize: 10, color: "#2323A580", letterSpacing: 1 },

  sessionsFull: { paddingHorizontal: 36, paddingTop: 14, paddingBottom: 4 },
  sessionRow:   { flexDirection: "row", alignItems: "flex-start", marginBottom: 13, paddingBottom: 13, borderBottomWidth: 1, borderBottomColor: C.lavDark },
  sessionTime:  { fontFamily: "SaansMono", fontSize: 10, color: "#2323A580", width: 62, letterSpacing: 0.5, paddingTop: 1 },
  sessionBody:  { flex: 1 },
  sessionTitle: { fontFamily: "Saans", fontSize: 13, fontWeight: 500, color: C.indigo, marginBottom: 3 },
  sessionDesc:  { fontFamily: "Saans", fontSize: 11, fontWeight: 500, color: "#2323A599", lineHeight: 1.5 },
  sessionBadge: { fontFamily: "SaansMono", fontSize: 8, color: C.cobalt, letterSpacing: 1, textTransform: "uppercase", marginLeft: 7, paddingHorizontal: 5, paddingVertical: 2, backgroundColor: "#1B1DB520" },
  sessionLoc:   { fontFamily: "SaansMono", fontSize: 10, color: "#2323A560", marginTop: 4 },

  infoGrid:      { paddingHorizontal: 36, paddingTop: 22, paddingBottom: 8, flexDirection: "row", flexWrap: "wrap" },
  infoCard:      { width: "50%", paddingRight: 18, marginBottom: 24 },
  infoCardTitle: { fontFamily: "Serrif", fontSize: 17, color: C.indigo, marginBottom: 7 },
  infoItem:      { fontFamily: "Saans", fontSize: 11, fontWeight: 500, color: "#2323A5CC", marginBottom: 4, lineHeight: 1.45 },
  infoItemBold:  { fontFamily: "Saans", fontSize: 11, fontWeight: 700, color: C.indigo },
  infoTip:       { fontFamily: "Saans", fontSize: 11, fontWeight: 500, color: C.cobalt, marginTop: 6 },

  faqPad:  { paddingHorizontal: 36, paddingTop: 22 },
  faqItem: { marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: C.lavDark },
  faqQ:    { fontFamily: "Serrif", fontSize: 15, color: C.indigo, marginBottom: 6 },
  faqA:    { fontFamily: "Saans", fontSize: 11, fontWeight: 500, color: "#2323A599", lineHeight: 1.55 },

  dinnerGrid:     { paddingHorizontal: 36, paddingTop: 18, paddingBottom: 8, flexDirection: "row", flexWrap: "wrap", gap: 14 },
  dinnerCard:     { width: "47%", backgroundColor: C.white, borderWidth: 1, borderColor: C.lavDark, padding: 12, marginBottom: 0 },
  dinnerGroupNum: { fontFamily: "SaansMono", fontSize: 9, color: C.cobalt, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 },
  dinnerRow:      { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 },
  dinnerName:     { fontFamily: "Saans", fontSize: 10, fontWeight: 500, color: C.indigo, flex: 1, paddingRight: 6 },
  dinnerTeam:     { fontFamily: "SaansMono", fontSize: 8, color: "#2323A560", letterSpacing: 0.5 },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Tip({ text }: { text: string }) {
  return <Text style={s.infoTip}>→  {text}</Text>;
}

function InfoItem({ children }: { children: React.ReactNode }) {
  return <Text style={s.infoItem}>·  {children}</Text>;
}

// ─── Cover ────────────────────────────────────────────────────────────────────
function Cover({ logoSrc }: { logoSrc: string }) {
  return (
    <Page size="A4" style={s.coverPage}>
      <View>
        <Image src={logoSrc} style={s.coverLogo} />
        <Text style={s.coverDates}>April 22–26</Text>
        <Text style={s.coverMeta}>Lisbon, Portugal  ·  Lisbon Marriott Hotel</Text>
      </View>
    </Page>
  );
}

// ─── Agenda ───────────────────────────────────────────────────────────────────
function AgendaPages() {
  return (
    <Page size="A4" style={s.contentPage} wrap>
      <View style={s.sectionBar} fixed>
        <Text style={s.sectionTitle}>Agenda</Text>
      </View>

      {agenda.days.map((day) => (
        <View key={day.id} wrap={false}>
          <View style={s.dayHeader}>
            <View>
              <Text style={s.dayLabel}>{day.label}  ·  {day.date}</Text>
              {day.theme ? <Text style={s.dayTheme}>{strip(day.theme)}</Text> : null}
            </View>
            {day.location ? <Text style={s.dayLocation}>{day.location}</Text> : null}
          </View>

          <View style={s.sessionsFull}>
            {day.sessions.map((session) => (
              <View key={session.id} style={s.sessionRow}>
                <Text style={s.sessionTime}>{session.time}</Text>
                <View style={s.sessionBody}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={s.sessionTitle}>{strip(session.title)}</Text>
                    <Text style={s.sessionBadge}>{session.type}</Text>
                  </View>
                  {session.description
                    ? <Text style={s.sessionDesc}>{strip(session.description)}</Text>
                    : null}
                  {session.location
                    ? <Text style={s.sessionLoc}>{session.location}</Text>
                    : null}
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </Page>
  );
}

// ─── Important Info ───────────────────────────────────────────────────────────
function InfoPage() {
  return (
    <Page size="A4" style={s.contentPage} wrap>
      <View style={s.sectionBar}>
        <Text style={s.sectionTitle}>Important Info</Text>
      </View>

      <View style={s.infoGrid}>
        <View style={s.infoCard}>
          <Text style={s.infoCardTitle}>Communication + Safety</Text>
          <InfoItem>Slack: <Text style={s.infoItemBold}>#lisbon-company-offsite-2026</Text></InfoItem>
          <InfoItem>Emergency (Portugal): <Text style={s.infoItemBold}>112</Text></InfoItem>
          <InfoItem>Kendalle: <Text style={s.infoItemBold}>+1 916 837 2433</Text></InfoItem>
          <InfoItem>Sarah: <Text style={s.infoItemBold}>+1 602 295 7117</Text></InfoItem>
          <Tip text="iMessage + WhatsApp both work." />
        </View>

        <View style={s.infoCard}>
          <Text style={s.infoCardTitle}>Key Dates</Text>
          <InfoItem>Arrival (Fly In): <Text style={s.infoItemBold}>Wednesday, April 22</Text></InfoItem>
          <InfoItem>Departure (Fly Out): <Text style={s.infoItemBold}>Sunday, April 26</Text></InfoItem>
          <InfoItem>Hotel Check-In: <Text style={s.infoItemBold}>4:00 PM</Text></InfoItem>
          <InfoItem>Hotel Check-Out: <Text style={s.infoItemBold}>12:00 PM</Text></InfoItem>
          <Tip text="Plan to arrive Wednesday and settle in ahead of the welcome party." />
        </View>

        <View style={s.infoCard}>
          <Text style={s.infoCardTitle}>Hotel</Text>
          <InfoItem>Hotel: <Text style={s.infoItemBold}>Lisbon Marriott Hotel</Text></InfoItem>
          <InfoItem>Av. dos Combatentes 45, 1600-042 Lisboa</InfoItem>
          <InfoItem>Closest hospital: Hospital de Santa Maria</InfoItem>
          <InfoItem>Roommate message from Kendalle by <Text style={s.infoItemBold}>Tuesday 4/14</Text></InfoItem>
        </View>

        <View style={s.infoCard}>
          <Text style={s.infoCardTitle}>Transportation</Text>
          <InfoItem>Bus required for Thursday offsite</InfoItem>
          <InfoItem>Bus required for Saturday activity + send-off</InfoItem>
          <InfoItem>Kendalle + Sarah doing headcounts</InfoItem>
          <Tip text="Be on time. Everyone must be on the bus." />
        </View>

        <View style={s.infoCard}>
          <Text style={s.infoCardTitle}>Arrival + Airport</Text>
          <InfoItem>Fly into <Text style={s.infoItemBold}>Lisbon Airport (LIS)</Text></InfoItem>
          <InfoItem>Uber/Bolt → ~15–25 min to hotel (~€15–20)</InfoItem>
          <InfoItem>Airport Ubers → expense</InfoItem>
          <Tip text="Screenshot the hotel address before you land." />
        </View>

        <View style={s.infoCard}>
          <Text style={s.infoCardTitle}>Expenses</Text>
          <InfoItem>Ubers to/from airport → expense</InfoItem>
          <InfoItem>All other food + events → covered</InfoItem>
          <Tip text="Additional expenses must be approved by your manager." />
        </View>

        <View style={s.infoCard}>
          <Text style={s.infoCardTitle}>Weather</Text>
          <InfoItem>Highs: ~65–75°F</InfoItem>
          <InfoItem>Lows: ~50–55°F</InfoItem>
          <InfoItem>Mild, mix of sun + clouds</InfoItem>
        </View>

        <View style={s.infoCard}>
          <Text style={s.infoCardTitle}>What to Pack</Text>
          <InfoItem>Casual, comfortable — be you (AirOps standard)</InfoItem>
          <InfoItem>Comfortable walking shoes (hills + cobblestone)</InfoItem>
          <InfoItem>Light jacket</InfoItem>
          <InfoItem>EU adapter (Type F plug)</InfoItem>
          <InfoItem>Laptop + charger</InfoItem>
        </View>

        <View style={s.infoCard}>
          <Text style={s.infoCardTitle}>Spouses / Guests</Text>
          <InfoItem>Invited to Saturday send-off party only</InfoItem>
          <InfoItem>Eligible for hotel room block Saturday night only</InfoItem>
          <InfoItem>Not included in other programming</InfoItem>
        </View>
      </View>
    </Page>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FaqPage() {
  const faqs = [
    { q: "What language is spoken?", a: "Portuguese is the local language. English is widely spoken in Lisbon (especially hotels + restaurants). Key phrases: Ola (hello), Obrigado/Obrigada (thank you), Por favor (please), Desculpe (excuse me), Fala ingles? (do you speak English?)." },
    { q: "What about food, allergies, or dietary restrictions?", a: "All catering has been planned with dietary needs in mind. If anything isn't working, find Kendalle or Sarah and we'll take care of it." },
    { q: "How much should I tip?", a: "Not required. Typical: 5–10% at restaurants." },
    { q: "What should I expect getting around Lisbon?", a: "Lots of walking, hills, and cobblestone streets. Choose footwear wisely." },
    { q: "What about alcohol?", a: "There will be alcohol at events. Be mindful and know your limits. Show up the next day ready to go." },
    { q: "Any team expectations?", a: "Be inclusive. Mix across teams. Don't just stick with your usual group." },
    { q: "Jet lag tips?", a: "You'll arrive Wednesday — use that time to settle in. Take care of yourself ahead of Thursday." },
    { q: "What if something goes wrong or I need help?", a: "Emergency number in Lisbon: 112. Or contact Kendalle (+1 916 837 2433) or Sarah (+1 602 295 7117). Don't hesitate to reach out." },
    { q: "Final Note", a: "We'll handle the logistics — but please read all the information provided. You just need to: show up, be a great teammate, and enjoy Lisbon." },
  ];

  return (
    <Page size="A4" style={s.contentPage} wrap>
      <View style={s.sectionBar}>
        <Text style={s.sectionTitle}>FAQ</Text>
      </View>
      <View style={s.faqPad}>
        {faqs.map(({ q, a }) => (
          <View key={q} style={s.faqItem} wrap={false}>
            <Text style={s.faqQ}>{q}</Text>
            <Text style={s.faqA}>{a}</Text>
          </View>
        ))}
      </View>
    </Page>
  );
}

// ─── Dinner Groups ────────────────────────────────────────────────────────────
function DinnerGroupsPage() {
  return (
    <Page size="A4" style={s.contentPage} wrap>
      <View style={s.sectionBar} fixed>
        <Text style={s.sectionTitle}>Friday Dinner Groups</Text>
      </View>
      <View style={s.dinnerGrid}>
        {dinnerGroups.map((g) => (
          <View key={g.group} style={s.dinnerCard} wrap={false}>
            <Text style={s.dinnerGroupNum}>Group {g.group}</Text>
            {g.people.map((p) => (
              <View key={p.name} style={s.dinnerRow}>
                <Text style={s.dinnerName}>{p.name}</Text>
                <Text style={s.dinnerTeam}>{p.team}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </Page>
  );
}

// ─── Document ─────────────────────────────────────────────────────────────────
export function OffsitePdf({ logoSrc }: { logoSrc: string }) {
  return (
    <Document title="AirOps Lisbon Offsite 2026" author="AirOps">
      <Cover logoSrc={logoSrc} />
      <AgendaPages />
      <InfoPage />
      <FaqPage />
      <DinnerGroupsPage />
    </Document>
  );
}
