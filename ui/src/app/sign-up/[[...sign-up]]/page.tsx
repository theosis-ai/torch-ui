'use client';
import { SignUp } from "@stackframe/stack";

export default function DefaultSignUp() {
  // optionally redirect to some other page if the user is already signed in
  // const user = useUser();
  // if (user) { redirect to some other page }
  return <SignUp 
  fullPage
  automaticRedirect
  />;
}
