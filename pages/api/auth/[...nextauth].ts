import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "@/database"

export const authOptions: NextAuthOptions = {
  
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'correo@gmail.com' },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' },
      },
      async authorize(credentials){
        //console.log('x', {credentials});
        return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password );
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],

  // Custom Page
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // cada día
  },
  // Callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      if ( account ){
        token.accessToken = account.access_token;
      }
      switch( account?.type ){
        case 'oauth': 
          token.user = await dbUsers.oAUthToDbUser( user?.email || '', user?.name || '' );
        break;

        case 'credentials':
          token.user = user;
        break;
      }



      return token;
    },
    async session({ session, token, user }) {
      console.log('zz', session);
      session.accessToken = token.accessToken as any;
      session.user = token.user as any;

      return session;
    }
  }
}
export default NextAuth(authOptions);