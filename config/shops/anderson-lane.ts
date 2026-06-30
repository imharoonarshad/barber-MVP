import type { Shop } from "../types";

/* ============================================================================
   Anderson Lane Barber Shop — Austin, TX  (the original template tenant).
   A real no-website lead, used as the default/fallback shop.
   ============================================================================ */
export const andersonLane: Shop = {
  slug: "anderson-lane",
  domains: ["andersonlanebarber.com", "www.andersonlanebarber.com"],

  // ---- Identity ----
  name: "Anderson Lane Barber Shop",
  shortName: "Anderson Lane",
  tagline: "Classic cuts, modern fades — Austin's neighborhood barbershop since 2009.",
  established: "2009",
  logoText: "ALB",

  // ---- Contact ----
  phone: "(512) 302-0331",
  email: "hello@andersonlanebarber.com",
  address: "1728 W Anderson Ln, Austin, TX 78757",
  city: "Austin, TX",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Anderson+Lane+Barber+Shop+Austin+TX",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
  },

  // ---- Social proof ----
  rating: 4.7,
  reviewCount: 196,

  // ---- Hero ----
  hero: {
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1600&q=80",
    headline: "Look sharp.\nFeel sharper.",
    sub: "Walk-ins welcome, appointments preferred. Skilled barbers, hot-towel finishes, and the best straight-razor lineup on Anderson Lane.",
  },

  // ---- Why choose us ----
  features: [
    {
      icon: "award",
      title: "Master barbers",
      body: "Every barber is licensed with 10+ years behind the chair. No apprentices on your head.",
    },
    {
      icon: "clock",
      title: "Walk-ins welcome",
      body: "Booked solid? Walk in and we'll fit you in as soon as a chair opens up.",
    },
    {
      icon: "sparkle",
      title: "Premium products",
      body: "Hot towels, top-shelf pomades and balms, and a finish that lasts past the weekend.",
    },
    {
      icon: "calendar",
      title: "Easy online booking",
      body: "Pick your barber and time in under a minute. Get a text reminder before your slot.",
    },
  ],

  // ---- About / story ----
  about: {
    heading: "A proper barbershop, the way it should be",
    body: [
      "For over a decade, Anderson Lane Barber Shop has been Austin's go-to for precision cuts and classic grooming. No gimmicks — just experienced barbers who take the time to get it right.",
      "From skin fades to straight-razor shaves, every chair comes with a hot towel, an honest conversation, and a finish you'll want to show off. We're a neighborhood shop at heart: the kind of place where the barber remembers your name and your usual.",
    ],
    image:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80",
    stats: [
      { value: "15+", label: "Years on Anderson Ln" },
      { value: "12k+", label: "Cuts every year" },
      { value: "4.7★", label: "From 196 reviews" },
    ],
  },

  values: [
    {
      title: "Craft over speed",
      body: "We'd rather take an extra five minutes than rush a fade. You'll feel the difference at the mirror.",
    },
    {
      title: "Respect the chair",
      body: "Clean tools, fresh capes, and a spotless station every single time. Hygiene isn't optional.",
    },
    {
      title: "Consistency, every visit",
      body: "Your cut should look as good on visit fifty as it did on visit one. That's the standard.",
    },
  ],

  milestones: [
    { year: "2009", title: "We opened our doors", body: "Two chairs, one straight razor, and a line out the door by month three." },
    { year: "2014", title: "Grew to four chairs", body: "Added the team and our signature hot-towel shave service." },
    { year: "2019", title: "Voted Best in North Austin", body: "Recognized by the neighborhood we've always served." },
    { year: "2024", title: "12,000+ cuts a year", body: "Still family-run, still on Anderson Lane, still sharp." },
  ],

  // ---- Services ----
  services: [
    { category: "Haircuts", name: "Fade", price: "$35", duration: "40 min", description: "Crisp skin or taper fade, blended clean with a razor-sharp lineup.", popular: true },
    { category: "Haircuts", name: "High & Tight", price: "$28", duration: "30 min", description: "Short, sharp and low-maintenance — tight sides, clean finish.", popular: true },
    { category: "Haircuts", name: "Flat Top", price: "$32", duration: "35 min", description: "A precision flat top with clean, level edges — an Anderson Lane classic." },
    { category: "Haircuts", name: "Classic Cut", price: "$30", duration: "30 min", description: "Scissor or clipper cut tailored to you, finished with a hot towel." },
    { category: "Haircuts", name: "Kids Cut (Under 12)", price: "$25", duration: "25 min", description: "Patient, friendly cuts for the next generation of sharp dressers." },
    { category: "Haircuts", name: "Senior Cut (65+)", price: "$24", duration: "30 min", description: "A relaxed, unhurried cut at a neighborly price." },
    { category: "Beard & Shave", name: "Hot Shave (Straight Razor)", price: "$40", duration: "40 min", description: "Traditional hot-towel straight-razor shave — just like the sign says.", popular: true },
    { category: "Beard & Shave", name: "Beard Trim & Shape", price: "$20", duration: "20 min", description: "Detailed beard sculpting with hot-towel prep and oil finish." },
    { category: "Beard & Shave", name: "Cut + Beard Combo", price: "$50", duration: "50 min", description: "Our most-booked service. Full haircut plus beard shape-up." },
    { category: "Extras", name: "Lineup / Edge-up", price: "$15", duration: "15 min", description: "Sharpen your hairline and edges between full cuts." },
    { category: "Extras", name: "Gray Blending", price: "$35", duration: "45 min", description: "Subtly soften the gray for a natural, dialed-in look." },
    { category: "Extras", name: "Hair & Scalp Treatment", price: "$30", duration: "30 min", description: "Deep-clean wash and scalp treatment to keep things healthy." },
  ],

  // ---- Booking process ----
  bookingSteps: [
    { title: "Choose your service & barber", body: "Pick from the full menu and the barber you want — or let us match you with whoever's free." },
    { title: "Pick a time that suits you", body: "See live availability and grab an open slot. Greyed-out times are already taken." },
    { title: "Get a confirmation text", body: "We'll text to confirm and send a reminder before your appointment. That's it." },
  ],

  // ---- Team ----
  stylists: [
    {
      name: "Marcus Reed",
      role: "Master Barber · Owner",
      bio: "Marcus opened Anderson Lane in 2009 and still works a full chair. He's known for flawless classic tapers and a straight-razor finish that can't be rushed.",
      photo: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&w=640&h=800&q=80",
      experience: "15+ years",
      specialties: ["Skin fades", "Straight razor", "Beard sculpting"],
      rating: 4.9,
      availableToday: true,
      daysOff: [0],
    },
    {
      name: "Diego Alvarez",
      role: "Senior Barber",
      bio: "The fade specialist. If it's crisp, blended, and razor-sharp, Diego's your guy. He's also the best in the shop with kids' cuts.",
      photo: "https://images.unsplash.com/photo-1512864084360-7c0c4d0a0845?auto=format&fit=crop&w=640&h=800&q=80",
      experience: "9 years",
      specialties: ["Modern fades", "Hair designs", "Kids cuts"],
      rating: 4.8,
      availableToday: true,
      daysOff: [0, 1],
    },
    {
      name: "Andre Thompson",
      role: "Barber",
      bio: "Classic gentleman's cuts and the smoothest hot-towel shave in the shop. Andre takes his time and treats every client like a regular.",
      photo: "https://images.unsplash.com/photo-1593702295094-aea22597af65?auto=format&fit=crop&w=640&h=800&q=80",
      experience: "7 years",
      specialties: ["Scissor work", "Hot-towel shave", "Gray blending"],
      rating: 4.7,
      availableToday: false,
      daysOff: [0, 3],
    },
  ],

  // ---- Gallery ----
  gallery: [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1596728325488-58c87691e9af?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521322714240-ee1d383eab62?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1635273051937-a0ddef9573b6?auto=format&fit=crop&w=800&q=80",
  ],

  // ---- Reviews ----
  reviews: [
    { name: "Jordan M.", rating: 5, date: "2 weeks ago", service: "Skin Fade", text: "Best fade I've had in Austin, hands down. Marcus took his time and the hot towel finish was perfect. Already booked my next one." },
    { name: "Chris P.", rating: 5, date: "1 month ago", service: "Cut + Beard Combo", text: "Been coming here for years. Consistent, friendly, and they actually listen to what you want. Diego is a magician with fades." },
    { name: "Tariq B.", rating: 5, date: "1 month ago", service: "Classic Cut", text: "Walked in on a Saturday, short wait, walked out looking fresh. Old-school barbershop vibe done right." },
    { name: "Sam R.", rating: 4, date: "2 months ago", service: "Straight Razor Shave", text: "Great cut and straight-razor shave. Gets busy on weekends so book ahead — worth it." },
    { name: "Mike D.", rating: 5, date: "2 months ago", service: "Executive Cut & Style", text: "The executive cut is worth every penny. Wash, massage, the works. I leave feeling like a new man every time." },
    { name: "Andre L.", rating: 5, date: "3 months ago", service: "Kids Cut", text: "My son actually sits still for Diego. That alone earns five stars. Great with kids and a clean cut too." },
    { name: "Brian K.", rating: 5, date: "3 months ago", service: "Beard Trim & Shape", text: "Finally a shop that knows how to shape a beard properly. Sharp lines, no nicks, and they remember how I like it." },
    { name: "Devon W.", rating: 4, date: "4 months ago", service: "Skin Fade", text: "Solid fade every time. Friendly crew, fair prices, and the playlist is always on point. My regular spot now." },
  ],

  // ---- FAQ ----
  faqs: [
    { q: "Do I need an appointment?", a: "Walk-ins are always welcome, but booking ahead guarantees your barber and time — especially on evenings and weekends when we're busiest." },
    { q: "Can I request a specific barber?", a: "Absolutely. Pick your barber when you book online, or just ask at the front desk. If they're out, we'll match you with someone great." },
    { q: "How long does a typical visit take?", a: "Most haircuts run 30–45 minutes. Combo services like cut + beard take around 50 minutes. We'll never rush your chair." },
    { q: "What payment methods do you accept?", a: "Cash, all major cards, and contactless / mobile pay. Tips can be added on card or left in cash — whatever's easiest." },
    { q: "Do you cut children's hair?", a: "Yes — kids 12 and under have their own friendly, patient service. Diego is especially good with first-timers." },
    { q: "What's your cancellation policy?", a: "Life happens — just give us a heads up. We ask for 24 hours' notice on cancellations so we can offer the slot to someone else." },
  ],

  // ---- Hours ----
  hours: [
    { day: "Monday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Tuesday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Wednesday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Thursday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Friday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Saturday", open: "9:00 AM", close: "5:00 PM" },
    { day: "Sunday", open: null, close: null },
  ],

  // ---- Branding: warm dark + signboard gold (the original look) ----
  theme: {
    dark: {
      bg: "17 15 13",
      surface: "26 23 20",
      surface2: "37 33 28",
      ink: "245 243 240",
      muted: "170 161 150",
      line: "255 255 255",
      accent: "245 182 28",
      accentInk: "26 18 4",
      accent2: "209 49 42",
      accent2Ink: "255 255 255",
      poleBlue: "42 78 160",
      success: "74 169 108",
      danger: "214 96 96",
    },
    light: {
      bg: "250 249 246",
      surface: "255 255 255",
      surface2: "243 241 237",
      ink: "26 23 20",
      muted: "92 86 78",
      line: "17 15 12",
      accent: "161 98 7",
      accentInk: "255 255 255",
      accent2: "197 48 42",
      accent2Ink: "255 255 255",
      poleBlue: "42 78 160",
      success: "33 140 80",
      danger: "200 70 70",
    },
  },

  pitch: {
    show: true,
    message: "We built this demo for your shop — free.",
    ctaLabel: "Make it your real website",
    ctaEmail: "devtechamza@gmail.com",
  },
};
