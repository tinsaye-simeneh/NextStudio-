import { createEmptySocialLinks } from "../../../Clients/Components/Card Component/cardUtils";

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const createDefaultBusinessHours = () =>
  DAYS_OF_WEEK.map((day) => ({
    day,
    open: "09:00 AM",
    close: "06:00 PM",
    is_closed: day === "Sunday",
  }));

export const createEmptyCard = () => ({
  slug: "",
  card_type: "business",
  business_name: "",
  full_name: "",
  job_title: "",
  company_name: "",
  tagline: "",
  description: "",
  logo_url: "",
  profile_image_url: "",
  cover_url: "",
  email: "",
  phone: "",
  website: "",
  address: "",
  is_password_protected: false,
  password: "",
  theme: {
    primary_color: "#64748b",
    secondary_color: "#334155",
  },
  services: [],
  gallery: [],
  products: [],
  business_hours: createDefaultBusinessHours(),
  social_links: createEmptySocialLinks(),
});

export const slugify = (value) =>
  (value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getCardDisplayName = (card) =>
  card?.full_name || card?.business_name || card?.slug || "Untitled Card";

export const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
