import { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID ?? "",
            clientSecret: process.env.CLIENT_SECRET ?? ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token, user }) {
            // console.log(user.email);
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub
                }
            };
        },
    },

});

export { handler as GET, handler as POST }