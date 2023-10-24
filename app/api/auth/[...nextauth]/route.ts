import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const clientId = "238573122369-c114efqurbsu2v91l31elr8tq0jhj4u1.apps.googleusercontent.com";
const clientSecret = "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";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: clientId ?? "",
            clientSecret: clientSecret ?? ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST }