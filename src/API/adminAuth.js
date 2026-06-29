/** Supabase access token from admin login (`data.session.access_token`). */
export const getAdminAccessToken = () =>
  localStorage.getItem("token") || localStorage.getItem("access_token") || "";

export const getAdminAuthConfig = () => ({
  headers: { Authorization: `Bearer ${getAdminAccessToken()}` },
});

/** True when a 401 response is from the admin `protect` middleware, not card password flows. */
export const isAdminAuthFailure = (error) => {
  const message = (error?.response?.data?.message || "").toLowerCase();
  return (
    message.includes("not logged in") ||
    message.includes("authorization token") ||
    message.includes("invalid or expired token") ||
    message.includes("expired token")
  );
};
