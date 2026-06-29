import { FaClock } from "react-icons/fa";

const CardBusinessHours = ({ businessHours, colors }) => {
  if (!businessHours?.length) return null;

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section className="card-section rounded-2xl bg-white p-3 shadow-xl shadow-slate-200/60 sm:rounded-3xl sm:p-6">
      <div className="mb-4 flex items-center gap-3 sm:mb-5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
          style={{ backgroundColor: colors.primary }}
        >
          <FaClock />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900">Business Hours</h2>
          <p className="text-sm text-slate-500">When we are available</p>
        </div>
      </div>

      <div className="space-y-2">
        {businessHours.map((entry) => {
          const isToday = entry.day?.toLowerCase() === today.toLowerCase();

          return (
            <div
              key={entry.day}
              className={`flex flex-row items-center justify-between gap-2 rounded-xl px-3 py-3 text-sm vsm:flex-col vsm:items-start vsm:gap-1 sm:px-4 ${
                isToday ? "font-medium" : ""
              }`}
              style={
                isToday
                  ? {
                      backgroundColor: `${colors.primary}15`,
                      color: colors.secondary,
                    }
                  : { backgroundColor: "#f8fafc", color: "#475569" }
              }
            >
              <span className="shrink-0">{entry.day}</span>
              <span className="break-words vsm:text-left">
                {entry.is_closed
                  ? "Closed"
                  : `${entry.open} - ${entry.close}`}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CardBusinessHours;
