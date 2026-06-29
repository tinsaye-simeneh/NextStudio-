import { FaBriefcase, FaDumbbell, FaUser } from "react-icons/fa";

const SERVICE_ICONS = {
  personal: FaUser,
  business: FaBriefcase,
  default: FaDumbbell,
};

const CardServices = ({ services, colors, cardType = "business" }) => {
  if (!services?.length) return null;

  const Icon = SERVICE_ICONS[cardType] || SERVICE_ICONS.default;
  const title = cardType === "personal" ? "What I Do" : "Our Services";

  return (
    <section className="card-section rounded-2xl bg-white p-3 shadow-xl shadow-slate-200/60 sm:rounded-3xl sm:p-6">
      <div className="mb-3 flex items-center gap-3 sm:mb-5">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white sm:h-10 sm:w-10"
          style={{ backgroundColor: colors.primary }}
        >
          <Icon className="text-sm sm:text-base" />
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-slate-900 sm:text-lg">{title}</h2>
          <p className="text-xs text-slate-500 sm:text-sm">
            {cardType === "personal" ? "Skills & offerings" : "What we offer"}
          </p>
        </div>
      </div>

      {/* max-width breakpoints: sm = screens <= 780px */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-4">
        {services.map((service) => (
          <article
            key={service.id || service.title}
            className="flex min-w-0 flex-row items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 transition hover:border-slate-200 hover:shadow-sm sm:flex-col sm:rounded-2xl sm:p-4"
          >
            {service.icon_url ? (
              <img
                src={service.icon_url}
                alt=""
                className="h-10 w-10 shrink-0 rounded-lg object-cover sm:mb-1 sm:h-12 sm:w-12 sm:rounded-xl"
              />
            ) : (
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white sm:mb-1 sm:h-12 sm:w-12 sm:rounded-xl"
                style={{ backgroundColor: colors.secondary }}
              >
                <Icon className="text-base sm:text-lg" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h3 className="break-words text-sm font-semibold text-slate-900 sm:text-base">
                {service.title}
              </h3>
              {service.description && (
                <p className="mt-1 break-words text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">
                  {service.description}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CardServices;
