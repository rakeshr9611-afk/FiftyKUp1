import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        action: { label: "Action", type: "text" },
      },
      async authorize(credentials) {
        const { email, password, action } = credentials;

        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "rakeshr9611@gmail.com";
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Mets$$2025";

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          return { id: "admin", name: "Joe", email: ADMIN_EMAIL };
        }

        if (action === "signup") {
          return { id: String(Date.now()), name: credentials.name || email.split("@")[0], email };
        }

        return { id: String(Date.now()), name: email.split("@")[0], email };
      },
    }),
  ],
  pages: { signIn: "/auth" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) { if (user) token.name = user.name; return token; },
    async session({ session, token }) { if (token) session.user.name = token.name; return session; },
  },
  secret: process.env.NEXTAUTH_SECRET || "fiftykup-dev-secret",
};

export default NextAuth(authOptions);
