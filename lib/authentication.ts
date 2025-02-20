export const parseURLError = (error: string | null) => {
  if (!error) return undefined;
  switch (error) {
    case "OAuthAccountNotLinked":
      return "Email already in use with different provider!";

    default:
      return error;
  }
};
