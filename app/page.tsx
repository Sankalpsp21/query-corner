"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
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

  const testimonials = [
    {
      quote:
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
      name: "Charles Dickens",
      title: "A Tale of Two Cities",
    },
    {
      quote:
        "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
      name: "William Shakespeare",
      title: "Hamlet",
    },
    {
      quote: "All that we see or seem is but a dream within a dream.",
      name: "Edgar Allan Poe",
      title: "A Dream Within a Dream",
    },
    {
      quote:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      name: "Jane Austen",
      title: "Pride and Prejudice",
    },
    {
      quote:
        "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
      name: "Herman Melville",
      title: "Moby-Dick",
    },
  ];


  return (
    <main>
      <div className="container flex flex-col gap-8">
            <div className="flex flex-col items-center justify-center h-[50vh] mt-10">
              <motion.div
                variants={landingText}
                initial="hidden"
                animate="visible"
              >
                <h1 className="text-8xl font-bold text-center">
                  The Query Platform for 

                    Everyone
                </h1>

                <div className="flex flex-row items-center justify-center mt-16">
                  <h3 className="text-3xl text-center font-semibold">
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
                  <BackgroundGradient className="p-0.1 bg-transparent " containerClassName="mt-16 transform transition-transform duration-200 hover:scale-110">
                    <SignInButton mode="modal" afterSignInUrl='/dashboard'> 
                        <Button size="lg" variant="hover" className="foreground text-xl font-bold text-center">
                            Get Started for Free
                        </Button>
                    </SignInButton>
                  </BackgroundGradient>
              </motion.div>

            </div>
      </div>
        <InfiniteMovingCards
          className="mt-16"
          items={testimonials}
          direction="right"
          speed="slow"
        />
    </main>
  );
}

