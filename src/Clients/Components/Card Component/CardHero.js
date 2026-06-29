import {
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import {
  getCardAvatar,
  getCardName,
  getCardSubtitle,
  getCardType,
  getQrCodeUrl,
  hasBusinessHours,
  isOpenNow,
} from "./cardUtils";

const CardHero = ({ card, colors }) => {
  const cardType = getCardType(card);
  const isPersonal = cardType === "personal";
  const name = getCardName(card);
  const subtitle = getCardSubtitle(card);
  const avatar = getCardAvatar(card);
  const showHoursBadge = hasBusinessHours(card);
  const isOpen = showHoursBadge && isOpenNow(card.business_hours);

  return (
    <section
      className={`card-section relative overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/60 sm:rounded-3xl ${
        isPersonal ? "text-center" : "s3m:text-center"
      }`}
    >
      <div
        className={`relative ${isPersonal ? "h-24 sm:h-36" : "h-32 sm:h-52"}`}
        style={{
          background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
        }}
      >
        {card.cover_url && (
          <img
            src={card.cover_url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="relative px-3 pb-4 sm:px-6 sm:pb-6">
        <div
          className={`${
            isPersonal
              ? "-mt-12 flex flex-col items-center sm:-mt-16"
              : "-mt-10 mb-3 flex items-center gap-3 s3m:flex-col s3m:items-center sm:-mt-14 sm:mb-4 sm:gap-4"
          }`}
        >
          <div
            className={`flex shrink-0 items-center justify-center overflow-hidden border-4 border-white bg-white shadow-lg ${
              isPersonal
                ? "h-20 w-20 rounded-full sm:h-32 sm:w-32"
                : "h-20 w-20 rounded-2xl sm:h-24 sm:w-24"
            }`}
          >
            {avatar ? (
              <img src={avatar} alt={name} className="h-full w-full object-cover" />
            ) : (
              <span
                className={`font-bold ${isPersonal ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}
                style={{ color: colors.primary }}
              >
                {name.charAt(0)}
              </span>
            )}
          </div>

          {showHoursBadge && !isPersonal && (
            <div className="min-w-0 pb-1">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                  isOpen
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {isOpen ? "Open now" : "Closed"}
              </span>
            </div>
          )}
        </div>

        {showHoursBadge && isPersonal && (
          <div className="mt-3 flex justify-center sm:mt-4">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                isOpen
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {isOpen ? "Available now" : "Currently unavailable"}
            </span>
          </div>
        )}

        <h1
          className={`break-words font-bold text-slate-900 ${
            isPersonal ? "mt-2 text-lg sm:mt-4 sm:text-3xl" : "text-lg sm:text-3xl"
          }`}
        >
          {name}
        </h1>

        {subtitle && (
          <p
            className={`mt-1 break-words text-sm text-slate-500 ${
              isPersonal
                ? "font-medium"
                : "font-medium uppercase tracking-wider"
            }`}
          >
            {subtitle}
          </p>
        )}

        {card.description && (
          <p
            className={`mt-3 break-words text-sm leading-relaxed text-slate-600 sm:mt-4 ${
              isPersonal ? "mx-auto max-w-md" : ""
            }`}
          >
            {card.description}
          </p>
        )}

        <div
          className={`mt-5 grid gap-3 sm:mt-6 s3m:mx-auto s3m:max-w-sm ${
            isPersonal ? "mx-auto max-w-sm" : ""
          }`}
        >
          {card.phone && (
            <a
              href={`tel:${card.phone}`}
              className="flex min-w-0 items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-700 transition hover:bg-slate-100 sm:px-4"
            >
              <FaPhoneAlt className="shrink-0" style={{ color: colors.primary }} />
              <span className="min-w-0 flex-1 break-all text-left">{card.phone}</span>
            </a>
          )}
          {card.email && (
            <a
              href={`mailto:${card.email}`}
              className="flex min-w-0 items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-700 transition hover:bg-slate-100 sm:px-4"
            >
              <FaEnvelope className="shrink-0" style={{ color: colors.primary }} />
              <span className="min-w-0 break-all s3m:text-left">{card.email}</span>
            </a>
          )}
          {card.website && (
            <a
              href={card.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-700 transition hover:bg-slate-100 sm:px-4"
            >
              <FaGlobe className="shrink-0" style={{ color: colors.primary }} />
              <span className="min-w-0 break-all s3m:text-left">
                {card.website.replace(/^https?:\/\//, "")}
              </span>
            </a>
          )}
          {card.address && (
            <div className="flex min-w-0 items-start gap-3 rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-700 sm:px-4">
              <FaMapMarkerAlt
                className="mt-0.5 shrink-0"
                style={{ color: colors.primary }}
              />
              <span className="break-words s3m:text-left">{card.address}</span>
            </div>
          )}
        </div>

        <div
          className={`mt-5 flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-3 sm:mt-6 sm:p-4 ${
            isPersonal ? "mx-auto max-w-xs" : ""
          }`}
        >
          <img
            src={card.qr_code_url || getQrCodeUrl(card.slug)}
            alt="QR Code"
            className="h-24 w-24 rounded-xl bg-white p-2 sm:h-36 sm:w-36"
          />
          <p className="mt-2 text-xs text-slate-500 sm:mt-3">Scan to view this card</p>
        </div>
      </div>
    </section>
  );
};

export default CardHero;
