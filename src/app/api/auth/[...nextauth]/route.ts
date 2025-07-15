import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/utils/supabase";
import { verify } from "argon2";
import type { JWT } from "next-auth/jwt";
import type { User, Session } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (error || !user || !user.password) return null;

        const isValid = await verify(user.password, credentials.password);
        if (!isValid) return null;

        const { data: existingAchievements } = await supabase
          .from("achievements")
          .select("id")
          .eq("user_id", user.id)
          .limit(1);

        if (!existingAchievements || existingAchievements.length === 0) {
          await supabase.from("achievements").insert([
            {
              user_id: user.id,
              type: "interface_explorer",
              awarded_at: new Date().toISOString(),
            },
          ]);
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | AdapterUser }) {
      if (user) {
        token.id = user.id;
        if ('username' in user && typeof user.username === 'string') {
          token.username = user.username;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // adding user ID to the session
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };