import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const formatPrice = (price, currency = "ETB") => {
  if (price == null) return "";
  const formatted = Number(price).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return currency === "ETB" ? `ብር${formatted}` : `${currency} ${formatted}`;
};

export const getCardType = (card) => {
  if (card?.card_type === "personal" || card?.card_type === "business") {
    return card.card_type;
  }
  if (card?.full_name && !card?.business_name) return "personal";
  if (card?.business_name && !card?.full_name) return "business";
  if (card?.full_name) return "personal";
  return "business";
};

export const getCardName = (card) =>
  card?.full_name || card?.business_name || card?.name || "Digital Card";

export const getCardSubtitle = (card) => {
  const type = getCardType(card);
  if (type === "personal") {
    const role = [card?.job_title, card?.company_name].filter(Boolean).join(" at ");
    return role || card?.tagline || "";
  }
  return card?.tagline || card?.company_name || "";
};

export const getCardLabel = (card) => {
  const type = getCardType(card);
  return type === "personal" ? "Personal Card" : "Business Card";
};

export const getCardAvatar = (card) =>
  card?.profile_image_url || card?.logo_url || card?.photo_url || null;

export const getCardShareUrl = (slug) => {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/cards/${slug}`;
  }
  return `/cards/${slug}`;
};

export const getQrCodeUrl = (slug) => {
  const shareUrl = getCardShareUrl(slug);
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(shareUrl)}`;
};

export const downloadCardPdf = async (element, card) => {
  if (!element) return false;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#f8fafc",
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.92);
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  const fileName = `${(card?.slug || getCardName(card)).replace(/\s+/g, "-")}.pdf`;
  pdf.save(fileName);
  return true;
};

export const shareCard = async (card) => {
  const url = getCardShareUrl(card.slug);
  const shareData = {
    title: getCardName(card),
    text: getCardSubtitle(card) || card?.description || getCardName(card),
    url,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (err) {
      if (err.name === "AbortError") return;
    }
  }

  await navigator.clipboard.writeText(url);
};

export const getThemeColors = (card) => {
  const theme = card?.theme || {};

  return {
    primary:
      theme.primary_color ||
      card?.primary_color ||
      theme.primary ||
      null,
    secondary:
      theme.secondary_color ||
      card?.secondary_color ||
      theme.secondary ||
      null,
  };
};

export const getResolvedThemeColors = (card) => {
  const colors = getThemeColors(card);

  return {
    primary: colors.primary || "#64748b",
    secondary: colors.secondary || "#334155",
  };
};

export const getThemePageBackground = (colors) => ({
  background: `linear-gradient(135deg, ${colors.secondary}12 0%, #ffffff 45%, ${colors.primary}12 100%)`,
});

export const getThemeTopBarBackground = (colors) => ({
  background: `linear-gradient(90deg, ${colors.secondary}, ${colors.primary})`,
});

export const SOCIAL_PLATFORMS = [
  { key: "whatsapp", label: "WhatsApp" },
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "twitter", label: "Twitter" },
  { key: "linkedin", label: "LinkedIn" },
];

export const normalizeSocialLinkEntry = (value) => {
  if (value && typeof value === "object") {
    return {
      enabled: Boolean(value.enabled),
      url: value.url || "",
    };
  }

  if (typeof value === "string" && value.trim()) {
    return { enabled: true, url: value.trim() };
  }

  return { enabled: false, url: "" };
};

export const createEmptySocialLinks = () =>
  SOCIAL_PLATFORMS.reduce((acc, { key }) => {
    acc[key] = { enabled: false, url: "" };
    return acc;
  }, {});

export const normalizeSocialLinks = (socialLinks = {}) => {
  const normalized = createEmptySocialLinks();

  SOCIAL_PLATFORMS.forEach(({ key }) => {
    normalized[key] = normalizeSocialLinkEntry(socialLinks[key]);
  });

  return normalized;
};

export const getEnabledSocialLinks = (card) =>
  SOCIAL_PLATFORMS.map(({ key, label }) => ({
    key,
    label,
    ...normalizeSocialLinkEntry(card?.social_links?.[key]),
  })).filter((item) => item.enabled && item.url);

export const getSocialLinkUrl = (card, platform) =>
  normalizeSocialLinkEntry(card?.social_links?.[platform]).url;

export const isSocialLinkEnabled = (card, platform) => {
  const entry = normalizeSocialLinkEntry(card?.social_links?.[platform]);
  return entry.enabled && Boolean(entry.url);
};

export const hasBusinessHours = (card) => card?.business_hours?.length > 0;

export const isOpenNow = (businessHours = []) => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayHours = businessHours.find(
    (entry) => entry.day?.toLowerCase() === today.toLowerCase()
  );

  if (!todayHours || todayHours.is_closed) return false;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const parseTime = (timeStr) => {
    if (!timeStr) return null;
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return null;
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const open = parseTime(todayHours.open);
  const close = parseTime(todayHours.close);
  if (open == null || close == null) return false;

  if (close < open) {
    return currentMinutes >= open || currentMinutes <= close;
  }

  return currentMinutes >= open && currentMinutes <= close;
};
