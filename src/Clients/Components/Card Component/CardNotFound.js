import { Link } from "react-router-dom";
import { FaArrowLeft, FaIdCard } from "react-icons/fa";
import CardHeader from "./CardHeader";
import { getResolvedThemeColors, getThemePageBackground } from "./cardUtils";

const CardNotFound = ({ slug }) => {
  const colors = getResolvedThemeColors({});

  return (
    <div
      className="card-page min-h-screen overflow-hidden"
      style={{ fontFamily: "Poppins, sans-serif", ...getThemePageBackground(colors) }}
    >
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${colors.secondary}, ${colors.primary})` }} />
      <CardHeader colors={colors} />

      <div className="relative flex min-h-[calc(100vh-57px)] items-center justify-center px-4 py-12">
        <div
          className="pointer-events-none absolute -left-20 top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
          style={{ backgroundColor: colors.primary }}
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-12 h-64 w-64 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: colors.secondary }}
        />

        <div className="relative w-full max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-xl shadow-slate-200/80 ring-1 ring-slate-100 sm:h-24 sm:w-24">
            <FaIdCard className="text-3xl sm:text-4xl" style={{ color: colors.primary }} />
          </div>

          <p
            className="text-6xl font-black tracking-tight sm:text-7xl"
            style={{
              background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </p>

          <h1 className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl">Card Not Found</h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500 sm:text-base">
            We couldn&apos;t find a digital card for{" "}
            <span className="font-medium text-slate-700">&ldquo;{slug}&rdquo;</span>.
            It may have been removed or the link might be incorrect.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 sm:w-auto"
              style={{ backgroundColor: colors.primary }}
            >
              <FaArrowLeft className="text-xs" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNotFound;
