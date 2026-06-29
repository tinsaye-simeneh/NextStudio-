import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { getEnabledSocialLinks } from "./cardUtils";

const SOCIAL_ICONS = {
  whatsapp: FaWhatsapp,
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
};

const SOCIAL_COLORS = {
  whatsapp: "#25D366",
  facebook: "#1877F2",
  instagram: "#E4405F",
  twitter: "#0F1419",
  linkedin: "#0A66C2",
};

const CardFloatingSocial = ({ card, colors }) => {
  const enabledSocialLinks = getEnabledSocialLinks(card);

  if (!enabledSocialLinks.length) return null;

  return (
    <div className="fixed bottom-20 right-3 z-40 flex flex-col gap-2.5 sm:bottom-6 sm:right-4 sm:gap-3">
      {enabledSocialLinks.map(({ key, label, url }) => {
        const Icon = SOCIAL_ICONS[key];
        const backgroundColor = SOCIAL_COLORS[key] || colors.primary;

        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full text-base text-white shadow-lg transition active:scale-95 sm:h-12 sm:w-12 sm:text-lg sm:hover:scale-105"
            style={{ backgroundColor }}
            aria-label={label}
            title={label}
          >
            {Icon && <Icon />}
          </a>
        );
      })}
    </div>
  );
};

export default CardFloatingSocial;
