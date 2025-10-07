import { OAuth2Client } from "google-auth-library";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUrl = process.env.GOOGLE_REDIRECT_URL;
const client = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: redirectUrl,
});

export function generateGoogleAuthUrl() {
  return client.generateAuthUrl({
    scope : [ "email" , "profile" , "openid" ],
    prompt : "consent",      // concent / select_account / none
    login_hint : "jeffreythomas10566x@gmail.com" // by default selects this account 
  })
}
// prompt: "consent" → Always show the consent screen again (used to get new permissions or a refresh token).

// prompt: "select_account" → Always show the account chooser (lets the user pick which Google account to use).

// prompt: "none" → No UI shown; silent login attempt (fails if user interaction is needed). only if there is 1 acc / if not then error 

export async function fetchUserFromGoogle(code) {
  console.log("Running fetchIdToken function...");
  const { tokens } = await client.getToken(code);

  const loginTicket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: clientId,
  });

  const userData = loginTicket.getPayload();
  console.log(userData);
  return userData;
}