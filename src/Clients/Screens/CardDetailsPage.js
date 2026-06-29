import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../../Url/Url";
import CardPasswordGate from "../Components/Card Component/CardPasswordGate";
import CardHeader from "../Components/Card Component/CardHeader";
import CardHero from "../Components/Card Component/CardHero";
import CardServices from "../Components/Card Component/CardServices";
import CardGallery from "../Components/Card Component/CardGallery";
import CardProducts from "../Components/Card Component/CardProducts";
import CardBusinessHours from "../Components/Card Component/CardBusinessHours";
import CardInquiryForm from "../Components/Card Component/CardInquiryForm";
import CardActions from "../Components/Card Component/CardActions";
import CardFloatingSocial from "../Components/Card Component/CardFloatingSocial";
import CardNotFound from "../Components/Card Component/CardNotFound";
import {
  getCardName,
  getCardType,
  getResolvedThemeColors,
  getThemePageBackground,
  getThemeTopBarBackground,
} from "../Components/Card Component/cardUtils";

const CardSection = ({ children }) => {
  if (!children) return null;
  return <>{children}</>;
};

const CardFooter = ({ colors }) => (
  <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
    Powered by{" "}
    <Link
      to="/"
      className="font-medium text-slate-600 transition hover:opacity-80"
      style={{ color: colors?.primary }}
    >
      Next Studio
    </Link>
  </footer>
);

const CardDetailsPage = () => {
  const { slug } = useParams();
  const printRef = useRef(null);
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [password, setPassword] = useState(null);
  const [needsPassword, setNeedsPassword] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true);
      setNotFound(false);

      try {
        const headers = password ? { "x-card-password": password } : {};
        const response = await axios.get(`${URL}/api/NextStudio/cards/${slug}`, {
          headers,
        });

        const cardData = response.data?.card;
        if (!cardData) {
          throw new Error("Card not found");
        }

        setCard(cardData);
        setNeedsPassword(false);
        document.title = `${getCardName(cardData)} | Digital Card`;
      } catch (err) {
        const status = err.response?.status;
        const apiMessage = err.response?.data?.message || "";

        // 401 = password required; 403 = wrong password when header was sent
        if (
          status === 401 ||
          (status === 403 && apiMessage.toLowerCase().includes("invalid password"))
        ) {
          setNeedsPassword(true);
          setCard(null);
        } else {
          setNotFound(true);
          setCard(null);
          document.title = "Card Not Found | Next Studio";
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCard();
      window.scrollTo(0, 0);
    }
  }, [slug, password]);

  if (loading) {
    const colors = getResolvedThemeColors({});
    return (
      <div className="card-page min-h-screen bg-slate-100">
        <CardHeader colors={colors} />
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="mx-auto h-64 max-w-xl rounded-2xl bg-slate-200 sm:h-72" />
            <div className="h-40 rounded-2xl bg-slate-200 sm:h-48" />
          </div>
        </div>
      </div>
    );
  }

  if (needsPassword) {
    const theme = getResolvedThemeColors({});
    return (
      <CardPasswordGate
        slug={slug}
        primaryColor={theme.primary}
        onVerified={(verifiedPassword) => setPassword(verifiedPassword)}
      />
    );
  }

  if (notFound || !card) {
    return <CardNotFound slug={slug} />;
  }

  const cardType = getCardType(card);
  const isPersonal = cardType === "personal";
  const cardName = getCardName(card);
  const colors = getResolvedThemeColors(card);

  const optionalSections = (
    <>
      <CardSection>
        {card.services?.length > 0 && (
          <CardServices services={card.services} colors={colors} cardType={cardType} />
        )}
      </CardSection>
      <CardSection>
        {card.gallery?.length > 0 && (
          <CardGallery gallery={card.gallery} colors={colors} />
        )}
      </CardSection>
      <CardSection>
        {card.products?.length > 0 && (
          <CardProducts products={card.products} colors={colors} />
        )}
      </CardSection>
      <CardSection>
        {card.business_hours?.length > 0 && (
          <CardBusinessHours businessHours={card.business_hours} colors={colors} />
        )}
      </CardSection>
      <CardInquiryForm slug={card.slug} colors={colors} recipientName={cardName} />
    </>
  );

  const pageShellClass = "card-page min-h-screen pb-10 sm:pb-28";

  if (isPersonal) {
    return (
      <div
        className={pageShellClass}
        style={{ fontFamily: "Poppins, sans-serif", ...getThemePageBackground(colors) }}
      >
        <div className="h-1 w-full" style={getThemeTopBarBackground(colors)} />
        <CardHeader colors={colors} />
        <div ref={printRef} className="mx-auto w-full max-w-xl px-3 py-5 sm:px-4 sm:py-8">
          <div className="space-y-4 sm:space-y-6">
            <CardHero card={card} colors={colors} />
            {optionalSections}
            <CardActions card={card} colors={colors} printRef={printRef} />
            <CardFooter colors={colors} />
          </div>
        </div>
        <CardFloatingSocial card={card} colors={colors} />
      </div>
    );
  }

  return (
    <div
      className={pageShellClass}
      style={{ fontFamily: "Poppins, sans-serif", ...getThemePageBackground(colors) }}
    >
      <div className="h-1 w-full" style={getThemeTopBarBackground(colors)} />
      <CardHeader colors={colors} />

      <div ref={printRef} className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-4 sm:py-8">
        <div className="flex flex-row items-start gap-8 s3m:flex-col s3m:gap-4">
          <aside className="sticky top-[49px] z-10 w-[360px] shrink-0 self-start s3m:static s3m:w-full">
            <div className="space-y-4 sm:space-y-6">
              <CardHero card={card} colors={colors} />
              <div className="s3m:hidden">
                <CardActions card={card} colors={colors} printRef={printRef} />
              </div>
            </div>
          </aside>

          <main className="min-w-0 w-full flex-1 space-y-4 overflow-x-hidden sm:space-y-6">
            {optionalSections}
            <div className="hidden s3m:block">
              <CardActions card={card} colors={colors} printRef={printRef} />
            </div>
            <CardFooter colors={colors} />
          </main>
        </div>
      </div>

      <CardFloatingSocial card={card} colors={colors} />
    </div>
  );
};

export default CardDetailsPage;
