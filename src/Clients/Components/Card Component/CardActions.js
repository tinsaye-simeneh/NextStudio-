import { useState } from "react";
import {
  FaFilePdf,
  FaShareAlt,
} from "react-icons/fa";
import {
  downloadCardPdf,
  getEnabledSocialLinks,
  isSocialLinkEnabled,
  shareCard,
} from "./cardUtils";

const CardActions = ({ card, colors, printRef }) => {
  const [copied, setCopied] = useState(false);
  const [savingPdf, setSavingPdf] = useState(false);

  const whatsappEnabled = isSocialLinkEnabled(card, "whatsapp");
  const resolvedWhatsappUrl = getEnabledSocialLinks(card).find(
    (item) => item.key === "whatsapp"
  )?.url;

  const handleShare = async () => {
    try {
      await shareCard(card);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  const handleSavePdf = async () => {
    if (!printRef?.current || savingPdf) return;

    setSavingPdf(true);
    try {
      await downloadCardPdf(printRef.current, card);
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setSavingPdf(false);
    }
  };

  return (
    <>
      <section className="card-section rounded-2xl bg-white p-3 shadow-xl shadow-slate-200/60 sm:rounded-3xl sm:p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Quick Actions</h2>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleSavePdf}
            disabled={savingPdf}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: colors.secondary }}
          >
            <FaFilePdf />
            {savingPdf ? "Saving PDF..." : "Save as PDF"}
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <FaShareAlt />
            {copied ? "Link copied!" : "Share Card"}
          </button>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-50 hidden border-t border-slate-200 bg-white/95 p-2 backdrop-blur-md sm:flex sm:p-3">
        <div className="mx-auto flex w-full max-w-lg gap-2 px-1">
          {card.phone && (
            <a
              href={`tel:${card.phone}`}
              className="flex-1 rounded-xl py-2.5 text-center text-xs font-medium text-white sm:py-3 sm:text-sm"
              style={{ backgroundColor: colors.secondary }}
            >
              Call
            </a>
          )}
          {whatsappEnabled && resolvedWhatsappUrl && (
            <a
              href={resolvedWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl py-2.5 text-center text-xs font-medium text-white sm:py-3 sm:text-sm"
              style={{ backgroundColor: "#25D366" }}
            >
              WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={handleSavePdf}
            disabled={savingPdf}
            className="flex-1 rounded-xl py-2.5 text-center text-xs font-medium text-white disabled:opacity-60 sm:py-3 sm:text-sm"
            style={{ backgroundColor: colors.primary }}
          >
            {savingPdf ? "..." : "PDF"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CardActions;
