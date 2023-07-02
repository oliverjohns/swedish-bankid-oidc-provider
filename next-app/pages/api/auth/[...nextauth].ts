import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { getProviders } from "next-auth/react";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  debug: true,
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    {
      id: "bankid",
      name: "BankID",
      type: "oauth",
      style: {
        logo: "./BankID_logo.svg",
        logoDark: "./BankID_logo_white.svg",
        bg: "#fff",
        bgDark: "#000",
        text: "#000",
        textDark: "#fff",
      },
      wellKnown: "http://localhost:3001/oidc/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "login",
          claims: {
            userinfo: { email: null },
            id_token: { email: null },
          },
        },
      },

      client: {
        id: "bankid",
        client_id: "bankid",
        client_secret: "supersecret123",
        redirect_uris: ["http://localhost:3000/api/auth/callback/bankid"],
        token_endpoint_auth_method: "none",
        introspection_endpoint_auth_method: "none",
      },
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile) {
        console.log("hello profile", profile);
        return {
          id: profile.sub,
          email: profile.email,
        };
      },
    },
  ],
  callbacks: {
    async session({ session, user, token }) {
      console.log("session", session, user, token, "\n\n");
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("redirect", url, baseUrl, "\n\n");
      return baseUrl;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signIn", user, "\n\n");
      return true;
    },
    async jwt({ token, account, user }) {
      console.log("JWT", token, account, user, "\n\n");
      token.userRole = "admin";
      return token;
    },
  },
};

export default NextAuth(authOptions);
