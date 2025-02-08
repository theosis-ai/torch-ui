import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    handler: "/handler",
    home: "/",
    signIn: '/sign-in',
    signUp: '/sign-up',
    afterSignIn: '/lab',
    afterSignUp: '/lab',
    afterSignOut: '/',
    accountSettings: '/account-settings',
  }
});
