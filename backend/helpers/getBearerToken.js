
export const getBearerToken = (req) => {
  const raw = req.headers.authorization || "";
  const parts = raw.split(" ");
  if (parts.length === 2 && /^Bearer$/i.test(parts[0])) return parts[1];
  return null;
};