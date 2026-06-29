import { FaShoppingBag } from "react-icons/fa";
import { formatPrice } from "./cardUtils";

const CardProducts = ({ products, colors }) => {
  if (!products?.length) return null;

  return (
    <section className="card-section rounded-2xl bg-white p-3 shadow-xl shadow-slate-200/60 sm:rounded-3xl sm:p-6">
      <div className="mb-4 flex items-center gap-3 sm:mb-5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
          style={{ backgroundColor: colors.primary }}
        >
          <FaShoppingBag />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900">Products</h2>
          <p className="text-sm text-slate-500">Featured items</p>
        </div>
      </div>

      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 snap-x snap-mandatory sm:gap-4">
        {products.map((product) => (
          <article
            key={product.id || product.name}
            className="w-[72vw] max-w-[240px] shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 sm:w-64 sm:max-w-none"
          >
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="h-36 w-full object-cover sm:h-40"
              />
            )}
            <div className="p-3 sm:p-4">
              <h3 className="font-semibold text-slate-900">{product.name}</h3>
              {product.description && (
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                  {product.description}
                </p>
              )}
              {product.price != null && (
                <p
                  className="mt-2 text-base font-bold sm:mt-3 sm:text-lg"
                  style={{ color: colors.primary }}
                >
                  {formatPrice(product.price, product.currency)}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CardProducts;
