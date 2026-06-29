import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { URL } from "../../../Url/Url";

const CardPasswordGate = ({ slug, onVerified, primaryColor }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${URL}/api/NextStudio/cards/${slug}/verify-password`,
        { password }
      );

      if (response.data?.success) {
        onVerified(password);
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to verify password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/15 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl text-white"
            style={{ backgroundColor: primaryColor }}
          >
            NFC
          </div>
          <h1 className="text-2xl font-semibold text-white">Protected Card</h1>
          <p className="mt-2 text-sm text-slate-300">
            Enter the password to view this card.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-white/40"
            required
          />

          {error && (
            <p className="text-sm text-red-300 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-3 font-medium text-white transition-opacity disabled:opacity-60"
            style={{ backgroundColor: primaryColor }}
          >
            {loading ? "Verifying..." : "View Card"}
          </button>
        </form>

        <Link
          to="/"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-300 transition hover:text-white"
        >
          <FaArrowLeft className="text-xs" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CardPasswordGate;
