const DEMO_BUSINESS_CARD = {
  slug: "AYAN-FITNESS",
  card_type: "business",
  business_name: "FITNESS STORE",
  tagline: "Services And Products",
  description:
    "በጣም ዘመናዊ የሆኑ የስፖርት እቃዎችን በተመጣጣኝ ዋጋ ከ2አመት ዋስትና ጋር አቅረበዋል #ከመወሰናቸው በፊት ሱቃችንን ይጎብኙ",
  logo_url: null,
  cover_url: null,
  email: "alikedir955@gmail.com",
  phone: "+251947134989",
  address: "ቦሌ መድሃኒያለም ሰላም ሲቲ ሞል 101 ቁጥር ያገኙናል",
  is_password_protected: false,
  theme: {
    primary_color: "#EF5B2C",
    secondary_color: "#102540",
  },
  services: [
    {
      id: 1,
      title: "FITNESS STORE",
      description: "አድራሻ ቦሌ መድሃኒያለም ሰላም ሲቲ ሞል 101 ቁጥር ያገኙናል",
      icon_url: null,
    },
  ],
  gallery: Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    image_url: `https://picsum.photos/seed/fitness-${index + 1}/600/600`,
    caption: `Gallery ${index + 1}`,
  })),
  products: [
    {
      id: 1,
      name: "Functional cable machine",
      description: "Free home delivery",
      price: 3000,
      currency: "ETB",
      image_url: "https://picsum.photos/seed/cable-machine/400/300",
    },
    {
      id: 2,
      name: "Nat baskat ball 3in one",
      description: "Premium quality sports equipment",
      price: 7500,
      currency: "ETB",
      image_url: "https://picsum.photos/seed/basketball/400/300",
    },
  ],
  business_hours: [
    { day: "Monday", open: "02:30 AM", close: "12:30 PM", is_closed: false },
    { day: "Tuesday", open: "12:00 AM", close: "12:00 AM", is_closed: false },
    { day: "Wednesday", open: "02:30 AM", close: "12:30 PM", is_closed: false },
    { day: "Thursday", open: "12:00 AM", close: "12:00 AM", is_closed: false },
    { day: "Friday", open: "02:15 AM", close: "02:30 AM", is_closed: false },
    { day: "Saturday", open: "12:00 AM", close: "12:00 AM", is_closed: false },
    { day: "Sunday", open: null, close: null, is_closed: true },
  ],
  social_links: {
    whatsapp: { enabled: true, url: "https://wa.me/251947134989" },
    facebook: { enabled: false, url: "" },
    instagram: { enabled: false, url: "" },
    twitter: { enabled: false, url: "" },
    linkedin: { enabled: false, url: "" },
  },
};

const DEMO_PERSONAL_CARD = {
  slug: "JOHN-DOE",
  card_type: "personal",
  full_name: "John Doe",
  job_title: "Product Designer",
  company_name: "Next Studio",
  description:
    "I help brands craft beautiful digital experiences. Available for freelance projects and collaborations.",
  profile_image_url: "https://picsum.photos/seed/john-profile/400/400",
  cover_url: null,
  email: "john.doe@example.com",
  phone: "+251911223344",
  website: "https://nextstudio.com",
  address: "Addis Ababa, Ethiopia",
  is_password_protected: false,
  theme: {
    primary_color: "#EF5B2C",
    secondary_color: "#102540",
  },
  services: [
    {
      id: 1,
      title: "UI/UX Design",
      description: "Web and mobile interface design from wireframes to polished prototypes.",
    },
    {
      id: 2,
      title: "Brand Identity",
      description: "Logo, color systems, and visual guidelines for growing businesses.",
    },
  ],
  gallery: Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    image_url: `https://picsum.photos/seed/john-work-${index + 1}/600/600`,
    caption: `Project ${index + 1}`,
  })),
  products: [],
  business_hours: [],
  social_links: {
    whatsapp: { enabled: true, url: "https://wa.me/251911223344" },
    linkedin: { enabled: true, url: "https://linkedin.com" },
    twitter: { enabled: true, url: "https://twitter.com" },
    facebook: { enabled: false, url: "" },
    instagram: { enabled: false, url: "" },
  },
};

const MOCK_CARDS = {
  "AYAN-FITNESS": DEMO_BUSINESS_CARD,
  "JOHN-DOE": DEMO_PERSONAL_CARD,
};

export const getMockCardBySlug = (slug) => {
  if (!slug) return null;
  const match = MOCK_CARDS[slug.toUpperCase()];
  return match ? { ...match, slug } : null;
};
