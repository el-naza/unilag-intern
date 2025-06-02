import React from 'react'
import Hero from './_components/hero/page'
import GetStarted from './_components/get-started/page'
import Testimonial from './_components/testimonial/page'
import Empower from './_components/empower/page'
import Connecting from './_components/connecting/page'
import Join from './_components/join/page'

export default function Home() {
  return (
    <>
      <Hero />
      <GetStarted />
      <Testimonial />
      <Empower />
      <Connecting />
      <Join
        headingText="Join the Internship Revolution"
        normalText="Sign up now to secure your spot and start your journey towards an exciting internship!"
        signingLink="https://cilpu.unilag.edu.ng/auth/sign-up/siwes-applicant"
      />
    </>
  )
}
