import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      // async authorize(credentials) {
      //   const user = { id: 1, name: "Test User" }
      //   return user
      // }
    }),
  ],
} satisfies NextAuthConfig