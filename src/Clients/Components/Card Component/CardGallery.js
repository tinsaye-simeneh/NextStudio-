import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaImages } from "react-icons/fa";

const CardGallery = ({ gallery, colors }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!gallery?.length) return null;

  const goNext = () => setActiveIndex((prev) => (prev + 1) % gallery.length);
  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  return (
    <section className="card-section rounded-2xl bg-white p-3 shadow-xl shadow-slate-200/60 sm:rounded-3xl sm:p-6">
      <div className="mb-4 flex items-center gap-3 sm:mb-5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
          style={{ backgroundColor: colors.primary }}
        >
          <FaImages />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900">Gallery</h2>
          <p className="text-sm text-slate-500">{gallery.length} photos</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-slate-100">
        <img
          src={gallery[activeIndex].image_url}
          alt={gallery[activeIndex].caption || `Gallery ${activeIndex + 1}`}
          className="aspect-[4/3] w-full object-cover"
        />

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 sm:left-3 sm:h-10 sm:w-10"
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 sm:right-3 sm:h-10 sm:w-10"
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-1.5 sm:mt-4 sm:grid-cols-6 sm:gap-2">
          {gallery.map((item, index) => (
            <button
              key={item.id || index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`overflow-hidden rounded-lg border-2 transition sm:rounded-xl ${
                index === activeIndex
                  ? "border-current shadow-md"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
              style={index === activeIndex ? { borderColor: colors.primary } : {}}
            >
              <img
                src={item.image_url}
                alt=""
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default CardGallery;
