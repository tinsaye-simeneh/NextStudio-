import { Link } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";

const CardHeader = ({ colors }) => {
  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="flex items-center justify-start px-3 py-2.5 sm:px-4 sm:py-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:px-3"
        >
          <FaArrowLeft className="text-xs" />
          <FaHome style={{ color: colors.primary }} />
          <span className="vsm:hidden">Back to Home</span>
          <span className="hidden vsm:inline">Home</span>
        </Link>
      </div>
    </header>
  );
};

export default CardHeader;
