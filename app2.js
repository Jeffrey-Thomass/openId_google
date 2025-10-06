import { OAuth2Client } from "google-auth-library";

const token = "hsehesj28388sdndjds"
const clientId = "594555697613-18p3s2o6hl7mvc3gj0o2a2bg7b27tj9m.apps.googleusercontent.com";
const client = new OAuth2Client(clientId);
const ticket = await client.verifyIdToken({
    idToken: token, audience: clientId 
});

console.log(ticket)


