import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID ?? "",
            clientSecret: process.env.CLIENT_SECRET ?? ""
        })
    ],
    secret: "64696cf5ebad83857a8d56c4d1be09d0",
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