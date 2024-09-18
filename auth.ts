import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {

            // Always redirect to /teams after sign in
            if (url.includes('/signin')) {
                return `${baseUrl}/teams`
            }

            // For all other cases, use the default logic
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`
            }
            else if (new URL(url).origin === baseUrl) {
                return url
            }
            
            return baseUrl
        },
    },
    pages: {
        signIn: '/signin',
        // error: '/auth/error',
        // signOut: '/auth/signout'
    },
})