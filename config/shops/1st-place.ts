import type { Shop } from "../types";

/* ============================================================================
   1st Place Barbering & ACA Salon — Montgomery, AL.
   Real lead data (name, phone, address, maps, rating/reviews). The rest —
   hours, services, team, photos, founding year — are sensible placeholders
   to confirm with the owner before going live. Distinct royal-blue + gold
   "podium" identity to set it apart from the gold/dark default tenant.
   ============================================================================ */
export const firstPlace: Shop = {
  slug: "1st-place",
  domains: [
    "1st-place-mvp.vercel.app",
    "1stplacebarbering.com",
    "www.1stplacebarbering.com",
  ],

  // ---- Identity ----
  name: "1st Place Barbering & ACA Salon",
  shortName: "1st Place Barbering",
  tagline: "Montgomery's barbershop & salon — sharp fades, fresh styles, full-service grooming.",
  established: "2016", // placeholder — confirm the real founding year
  logoText: "1P",

  // ---- Contact (real lead data) ----
  phone: "(334) 274-0838",
  email: "hello@1stplacebarbering.com", // placeholder inbox
  address: "5757 Atlanta Hwy, Montgomery, AL 36117",
  city: "Montgomery, AL",
  mapsUrl: "https://maps.google.com/?cid=12179253848641524259",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
  },

  // ---- Social proof (real) ----
  rating: 4.3,
  reviewCount: 155,

  // ---- Hero ----
  hero: {
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1600&q=80",
    headline: "Take 1st Place\nin the chair.",
    sub: "A full-service barbershop and salon on Atlanta Hwy. Precision fades, clean lineups, beard work and styling — for the whole family.",
  },

  // ---- Why choose us ----
  features: [
    {
      icon: "award",
      title: "Barbershop & salon",
      body: "Two crafts under one roof — barbering for the gents and full salon styling for everyone.",
    },
    {
      icon: "clock",
      title: "Walk-ins welcome",
      body: "Swing by on Atlanta Hwy and we'll get you in the chair as soon as one opens up.",
    },
    {
      icon: "sparkle",
      title: "Clean, sharp finishes",
      body: "Fresh tools, hot towels, and lineups crisp enough to take 1st place every time.",
    },
    {
      icon: "calendar",
      title: "Easy online booking",
      body: "Pick your barber or stylist and a time in under a minute. We'll text you a reminder.",
    },
  ],

  // ---- About / story ----
  about: {
    heading: "Montgomery's home for a fresh look",
    body: [
      "1st Place Barbering & ACA Salon brings classic barbering and full-service styling together on Atlanta Hwy. Whether it's a skin fade, a beard sculpt, or a full salon appointment, our chairs are run by pros who take pride in every finish.",
      "We're a welcoming, family-friendly shop — the kind of place where first-timers leave as regulars. Sit back, relax, and walk out feeling like you took home the trophy.",
    ],
    // Real shop interior — save the photo to public/shops/1st-place/interior.jpg
    image: "/shops/1st-place/interior.jpg",
    stats: [
      { value: "4.3★", label: "From 155 reviews" },
      { value: "2-in-1", label: "Barbershop + salon" },
      { value: "All ages", label: "Cuts for the family" },
    ],
  },

  values: [
    {
      title: "Every client wins",
      body: "You leave looking your best — that's the whole job. No rushed cuts, no shortcuts.",
    },
    {
      title: "Clean and professional",
      body: "Sanitized tools, fresh capes, and a tidy station for every single appointment.",
    },
    {
      title: "Barber and salon, done right",
      body: "From fades to full styling, the same standard of care across every chair.",
    },
  ],

  milestones: [
    { year: "2016", title: "Opened on Atlanta Hwy", body: "1st Place set up shop to serve Montgomery's east side." },
    { year: "2019", title: "Added the salon side", body: "Full-service styling joined the barbering for the whole family." },
    { year: "2022", title: "4.3★ and climbing", body: "Built a loyal book of regulars across 150+ reviews." },
    { year: "Today", title: "Your neighborhood shop", body: "Still focused on sharp, honest, friendly grooming." },
  ],

  // ---- Services (placeholder menu — confirm prices with the shop) ----
  services: [
    { category: "Haircuts", name: "Skin Fade", price: "$30", duration: "40 min", description: "Crisp skin or taper fade with a razor-sharp lineup.", popular: true },
    { category: "Haircuts", name: "Haircut", price: "$25", duration: "30 min", description: "Clipper or scissor cut tailored to you, finished clean." },
    { category: "Haircuts", name: "Cut & Style", price: "$35", duration: "45 min", description: "Full salon haircut and style for any hair type." },
    { category: "Haircuts", name: "Kids Cut (Under 12)", price: "$20", duration: "25 min", description: "Friendly, patient cuts for the little ones." },
    { category: "Haircuts", name: "Senior Cut (65+)", price: "$20", duration: "30 min", description: "A relaxed cut at a neighborly price." },
    { category: "Beard & Shave", name: "Beard Trim & Shape", price: "$15", duration: "20 min", description: "Detailed beard sculpting with a clean, oiled finish.", popular: true },
    { category: "Beard & Shave", name: "Hot Towel Shave", price: "$30", duration: "40 min", description: "Traditional hot-towel straight-razor shave." },
    { category: "Beard & Shave", name: "Cut + Beard Combo", price: "$40", duration: "50 min", description: "Full haircut plus a sharp beard shape-up." },
    { category: "Extras", name: "Lineup / Edge-up", price: "$12", duration: "15 min", description: "Sharpen your hairline and edges between cuts." },
    { category: "Extras", name: "Design / Hair Art", price: "$10+", duration: "15 min", description: "Add a custom design or part to finish the look." },
    { category: "Extras", name: "Wash & Condition", price: "$15", duration: "20 min", description: "Deep-clean wash and conditioning treatment." },
  ],

  // ---- Booking process ----
  bookingSteps: [
    { title: "Choose your service & chair", body: "Pick from barbering or salon services and the pro you'd like — or whoever's free." },
    { title: "Pick a time that suits you", body: "See open slots and grab one that works. Taken times are greyed out." },
    { title: "Get a confirmation text", body: "We'll text to confirm and send a reminder before your appointment." },
  ],

  // ---- Team (placeholder — swap for the real crew & photos) ----
  stylists: [
    {
      name: "Reggie Banks",
      role: "Master Barber · Owner",
      bio: "Reggie leads the shop with years behind the chair and a reputation for fades that don't quit. Precision is the whole point.",
      photo: "https://images.unsplash.com/photo-1635273051937-a0ddef9573b6?auto=format&fit=crop&w=640&h=800&q=80",
      experience: "12+ years",
      specialties: ["Skin fades", "Lineups", "Beard work"],
      rating: 4.8,
      availableToday: true,
      daysOff: [0],
    },
    {
      name: "Corey Daniels",
      role: "Senior Barber",
      bio: "Quick, clean, and consistent — Corey keeps the line moving without ever cutting a corner. Great with kids, too.",
      photo: "https://images.unsplash.com/photo-1653758265969-b048bb0b328a?auto=format&fit=crop&w=640&h=800&q=80",
      experience: "8 years",
      specialties: ["Tapers", "Kids cuts", "Designs"],
      rating: 4.6,
      availableToday: true,
      daysOff: [0, 1],
    },
    {
      name: "Malik Foster",
      role: "Barber & Stylist",
      bio: "Bridging the barber and salon side, Malik handles everything from classic cuts to full styling with an easy chairside manner.",
      photo: "https://images.unsplash.com/photo-1686671805337-7d8aa64b965f?auto=format&fit=crop&w=640&h=800&q=80",
      experience: "6 years",
      specialties: ["Cut & style", "Hot-towel shave", "Scissor work"],
      rating: 4.5,
      availableToday: false,
      daysOff: [0, 3],
    },
  ],

  // ---- Gallery ----
  gallery: [
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1596728325488-58c87691e9af?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521322714240-ee1d383eab62?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1635273051937-a0ddef9573b6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512864084360-7c0c4d0a0845?auto=format&fit=crop&w=800&q=80",
  ],

  // ---- Reviews (placeholder copy; rating/count are real) ----
  reviews: [
    { name: "Terrance W.", rating: 5, date: "3 weeks ago", service: "Skin Fade", text: "Cleanest fade I've gotten in Montgomery. In and out, sharp lineup, friendly staff. My new spot." },
    { name: "Keisha B.", rating: 5, date: "1 month ago", service: "Cut & Style", text: "Love that it's a barbershop and salon. Got my son's cut and my style done in one trip. Great experience." },
    { name: "Marcus J.", rating: 4, date: "1 month ago", service: "Cut + Beard Combo", text: "Solid cut and beard work. Gets busy on weekends but worth the short wait." },
    { name: "Andre P.", rating: 5, date: "2 months ago", service: "Haircut", text: "Reggie took his time and got it exactly how I asked. Professional and clean shop." },
    { name: "Darnell S.", rating: 4, date: "2 months ago", service: "Lineup / Edge-up", text: "Quick lineup between cuts, always crisp. Friendly every time I come in." },
    { name: "Tonya M.", rating: 5, date: "3 months ago", service: "Kids Cut", text: "They're so good with kids. My little one was nervous and left smiling with a fresh cut." },
    { name: "Chris D.", rating: 4, date: "3 months ago", service: "Beard Trim & Shape", text: "Good beard shape-up and hot towel. Comfortable chairs and a relaxed vibe." },
    { name: "Brandon T.", rating: 5, date: "4 months ago", service: "Skin Fade", text: "Consistent fades every visit. Fair prices and the barbers actually listen. Recommend." },
  ],

  // ---- FAQ ----
  faqs: [
    { q: "Are you a barbershop or a salon?", a: "Both — 1st Place is a full-service barbershop and ACA salon, so we handle classic barbering and full styling for the whole family." },
    { q: "Do I need an appointment?", a: "Walk-ins are welcome, but booking ahead guarantees your barber or stylist and time, especially on weekends." },
    { q: "Where are you located?", a: "5757 Atlanta Hwy, Montgomery, AL 36117 — easy parking right out front." },
    { q: "Do you cut children's hair?", a: "Yes — we love first-timers. Kids 12 and under have their own friendly, patient service." },
    { q: "What payment methods do you accept?", a: "Cash, all major cards, and contactless / mobile pay. Tips can go on card or in cash." },
    { q: "Can I request a specific barber or stylist?", a: "Of course. Choose your pro when you book online, or just ask at the front desk." },
  ],

  // ---- Hours (placeholder — confirm with the shop) ----
  hours: [
    { day: "Monday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Tuesday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Wednesday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Thursday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Friday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Sunday", open: null, close: null },
  ],

  // ---- Branding: warm tan/gold walls + espresso brown, pulled from the shop photo ----
  theme: {
    dark: {
      bg: "24 19 15",
      surface: "33 26 21",
      surface2: "46 37 29",
      ink: "245 241 233",
      muted: "176 164 147",
      line: "255 255 255",
      accent: "201 165 97",
      accentInk: "28 21 10",
      accent2: "138 86 56",
      accent2Ink: "255 255 255",
      poleBlue: "42 78 160",
      success: "74 169 108",
      danger: "214 96 96",
    },
    light: {
      bg: "248 244 236",
      surface: "255 255 255",
      surface2: "240 233 222",
      ink: "33 26 20",
      muted: "98 88 74",
      line: "26 20 14",
      accent: "150 110 45",
      accentInk: "255 255 255",
      accent2: "124 76 49",
      accent2Ink: "255 255 255",
      poleBlue: "42 78 160",
      success: "33 140 80",
      danger: "200 70 70",
    },
  },

  pitch: {
    show: true,
    message: "We built this demo for 1st Place — free.",
    ctaLabel: "Make it your real website",
    ctaEmail: "devtechamza@gmail.com",
  },
};
