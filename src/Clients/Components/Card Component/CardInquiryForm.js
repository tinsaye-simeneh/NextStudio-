import { useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Swal from "sweetalert2";
import { FaPaperPlane } from "react-icons/fa";
import { URL } from "../../../Url/Url";

const CardInquiryForm = ({ slug, colors, recipientName }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${URL}/api/NextStudio/cards/${slug}/inquiry`,
        { name, email, phone, message }
      );

      if (data?.success !== false) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Message sent!",
          text: `${recipientName} will get back to you soon.`,
          showConfirmButton: false,
          timer: 2200,
        });
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      }
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Could not send message",
        text:
          err.response?.data?.message ||
          "Please try again or contact them directly.",
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card-section rounded-2xl bg-white p-3 shadow-xl shadow-slate-200/60 sm:rounded-3xl sm:p-6">
      <div className="mb-4 flex items-center gap-3 sm:mb-5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
          style={{ backgroundColor: colors.primary }}
        >
          <FaPaperPlane />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900">Send Inquiry</h2>
          <p className="text-sm text-slate-500">We will respond as soon as possible</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card-inquiry-form space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name *"
          className="cinput box-border w-full max-w-full"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address *"
          className="cinput box-border w-full max-w-full"
          required
        />
        <div className="card-phone-input w-full max-w-full overflow-hidden">
          <PhoneInput
            international
            defaultCountry="ET"
            value={phone}
            onChange={setPhone}
          />
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message *"
          rows={4}
          className="ctextarea box-border w-full max-w-full"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="cbutton box-border w-full max-w-full disabled:opacity-60"
          style={{ backgroundColor: colors.primary }}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
};

export default CardInquiryForm;
