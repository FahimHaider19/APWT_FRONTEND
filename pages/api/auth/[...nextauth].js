
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import { User } from "next-auth";
import axios from "axios";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        console.log({ credentials, req });
        const { email, password } = credentials;
        // const res = await fetch("http://localhost:3000/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     username:email,
        //     password,
        //   }),
        // });
        const res = await axios.post("http://localhost:3000/login", {
            "username": email,
            "password": password
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // const res = await axios({
        //   method: 'post',
        //   url: 'http://localhost:3000/login',
        //   data: JSON.stringify({
        //     username:email,
        //     password,
        //   })
        // });
        const user = await res.data;

        console.log({ user });

        if ( user.access_token)
          return user;
        else 
          return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;
        return session;
    },
    
  },

  pages: {
    signIn: "/login",
    signOut: '/signout',
    error: '/error',
  },
};

export default NextAuth(authOptions);