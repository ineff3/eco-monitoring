import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const link = 'https://env-monitor-ullzynenoa-lm.a.run.app/'

export const authOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await fetch(`${link}api/Auth/Login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        userName: credentials?.username,
                        password: credentials?.password
                    }),
                    headers: {
                        'accept': 'text/plain',
                        'Content-Type': 'application/json'
                    },
                })
                const user = await res.json()


                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }: { session: any, token: any, user: any }) {
            session.user = token as any;
            return session;
        },
    },
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }