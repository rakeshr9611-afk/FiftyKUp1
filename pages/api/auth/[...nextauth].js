import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const users = [
  { id: "1", name: "Demo User", email: "demo@fiftykup.com", password: "demo123" },
];

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
        const { email, password, name, action } = credentials;
        if (action === "signup") {
          const existing = users.find(u => u.email === email);
          if (existing) throw new Error("Email already in use");
          const newUser = { id: String(Date.now()), name, email, password };
          users.push(newUser);
          return { id: newUser.id, name: newUser.name, email: newUser.email };
        }
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) throw new Error("Invalid email or password");
        return { id: user.id, name: user.name, email: user.email };
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
