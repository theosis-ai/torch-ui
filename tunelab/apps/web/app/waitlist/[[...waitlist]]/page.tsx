import { Waitlist } from '@clerk/nextjs'

export default function WaitlistPage() {
  return ( 
    <div className="flex justify-center py-24">
      <Waitlist signInUrl="/sign-in" afterJoinWaitlistUrl="/" />
    </div>
  )
}