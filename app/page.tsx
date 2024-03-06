"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";

export default function Home() {

  //Landing animation inspiration from https://github.com/Nyumat/TalkToBeavs/blob/deploy/frontend/src/components/landing/Hero.jsx
  const landingText = {
    hidden: {
      opacity: 0,
      y: 120,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delay: 0,
      },
      scale: 1,
    },
  };

  const landingButton = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delay: 1,
      },
      scale: 1,
    },
  };

  return (
      <main className="container max-w-6xl flex flex-col gap-8">
            <div className="flex flex-col items-center justify-center h-[50vh] mt-10">
              <motion.div
                variants={landingText}
                initial="hidden"
                animate="visible"
              >
                <h1 className="text-8xl foreground font-bold text-center">
                  The Query Platform for Everyone
                </h1>

                <div className="flex flex-row items-center justify-center mt-16">
                  <h3 className="text-3xl foreground text-center font-semibold">
                    Tailor-made Generative AI prompts that you can use to 
                    accelerate your workflow. Accessible. Customizable. Free.
                  </h3>
                </div>

              </motion.div>

              <motion.div
                  variants={landingButton}
                  initial="hidden"
                  animate="visible"
                >
                <SignInButton mode="modal" afterSignInUrl='/dashboard'> 
                  <Button size="lg" variant="hover" className="foreground text-xl font-bold text-center mt-16">
                    Get Started for Free
                  </Button>
                </SignInButton>
              </motion.div>
            </div>
      </main>
  );
}
