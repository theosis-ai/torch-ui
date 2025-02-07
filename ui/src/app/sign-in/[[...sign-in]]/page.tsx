'use client';
import { SignIn } from "@stackframe/stack";

export default function DefaultSignIn() {
  // optionally redirect to some other page if the user is already signed in
  // const user = useUser();
  // if (user) { redirect to some other page }
  return <SignIn 
  fullPage={true}
  automaticRedirect={true}
  />;
}
