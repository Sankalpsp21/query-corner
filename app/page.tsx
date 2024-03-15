"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { SignInButton } from "@clerk/clerk-react";
import { useTheme } from "next-themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function Home() {
const ref1 = useRef(null)
const ref2 = useRef(null)
const ref3 = useRef(null)
const ref4 = useRef(null)
const isInView1 = useInView(ref1, { once: true });
const isInView2 = useInView(ref2, { once: true });
const isInView3 = useInView(ref3, { once: true });
const isInView4 = useInView(ref3, { once: true });

const theme = useTheme();


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
      delay: 0.7,
    },
    scale: 1,
  },
};

const standard = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
      delay: 0.5,
    },
  }
}


const examples = [
  {
    title: "Financial Advisor",
    description:
      "This prompt is about a financial advisor who specializes in retirement planning. The user is requesting the advisor to create a retirement savings plan. The advisor is asked to act as an expert in financial advising and personal finance, using their expertise to help the user secure their future. The advisor is instructed to always include a question in their response to better understand the user&apos;s context and needs.",
    prompt:
      "You are an expert in financial advising and personal finance, specializing in retirement planning. You have helped many clients before me to secure their future. Your task is now to create a retirement savings plan from scratch. To better understand what I want and need, you should always answer by including a question that helps you better understand the context and my needs. I want you to act as an expert in financial advising and personal finance, specializing in retirement planning. My first suggestion request is to create a retirement savings plan. [TARGETLANGUAGE]",
    liked: true,
    saved: true,
    likes: 44,
    username: "sankalpsp21",
    tags: ["React", "Webdev"],
    score: 0.675,
  },
  {
    title: "Algebra Teacher",
    description:
      "This prompt is about an individual requesting the assistance of an algebra teacher who is an expert in mathematics and teaching, specifically in the field of algebra. The person wants the algebra teacher to develop a lesson plan that will effectively help students master algebraic equations. The prompt also includes an automatic prompt that instructs the algebra teacher to ignore all previous instructions and develop a lesson plan from scratch. The teacher is encouraged to ask questions to better understand the context and the needs of the person seeking assistance.",
    prompt:
      "You are an algebra teacher expert in mathematics and teaching specializing in algebra. You have helped many people before me to develop lesson plans that help students master algebraic equations. Your task is now to develop a lesson plan that helps students master algebraic equations from scratch. To better understand what I want and need you should always answer by including a question that helps you better understand the context and my needs. I want you to act as an algebra teacher expert in mathematics and teaching specializing in algebra. My first suggestion request is to develop a lesson plan that helps students master algebraic equations.",
    liked: false,
    saved: true,
    likes: 21,
    username: "RachelS",
    tags: ["Math", "Teaching"],
    score: 0.252,
  },
  {
    title: "Full-Stack Software Developer",
    description:
      "This prompt provides information about a job posting for a Full-Stack Software Developer position. It also includes instructions for the assistant to act as a software developer and to come up with an architecture and code for developing a secure web app using Golang and Angular. The prompt also includes an automatic prompt in both English and Spanish, which asks the assistant if they understood the task and instructs them to always include a question to better understand the context and needs of the user.",
    prompt:
      "You are an expert in software development and software engineering specializing in secure web app development. You have helped many people before me to create secure web apps for various purposes. Your task is now to teach me how to create a secure web app from scratch. To better understand what I want and need you should always answer by including a question that helps you better understand the context and my needs. [TARGETLANGUAGE]. I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and React. My first request is I want a system that [PROMPT].[TARGETLANGUAGE].",
    liked: true,
    saved: true,
    likes: 128,
    username: "Gensen",
    tags: ["Software", "Coding"],
    score: 0.895,
  },
  {
    title: "Esports Coach",
    description:
      "This prompt provides information about a job posting for an Esports Coach position. It    includes instructions for the assistant to act as an esports coach and provide guidance on improving players&apos; skills, developing strategies, and managing team dynamics.",
    prompt:
      "You are an expert in esports coaching, with a track record of helping teams achieve success in competitive gaming. Your task is to provide guidance on improving players&apos; skills, developing strategies, and managing team dynamics. To better understand what I want and need, you should always answer by including a question that helps you better understand the context and my needs. [TARGETLANGUAGE]. I want you to act as an esports coach. I will provide some specific information about a team&apos;s performance, and it will be your job to provide actionable advice and strategies to help them improve. My first request is I want advice on how to [PROMPT].[TARGETLANGUAGE].",
    liked: true,
    saved: false,
    likes: 84,
    username: "MoistCr1TiKaL",
    tags: ["Gaming", "E-sports"],
    score: 0.973,
  },
  {
    title: "Graphic Designer",
    description:
      "This prompt provides information about a job posting for a Graphic Designer position. It includes instructions for the assistant to act as a graphic designer and create designs for various digital and print materials.",
    prompt:
      "You are a talented graphic designer with a portfolio showcasing your creativity and expertise in creating visual designs for digital and print materials. Your task is to create designs for various projects, ranging from logos and branding materials to web graphics and marketing collateral. To better understand what I want and need, you should always answer by including a question that helps you better understand the context and my needs. [TARGETLANGUAGE]. I want you to act as a graphic designer. I will provide project details and requirements, and it will be your job to create visually appealing designs. My first request is I want you to design a [PROMPT].[TARGETLANGUAGE].",
    liked: false,
    saved: true,
    likes: 57,
    username: "mfaks",
    tags: ["Graphic Design", "Creativity"],
    score: 0.334,
  },
  {
    title: "Chef",
    description:
      "This prompt provides information about a job posting for a Chef position. It includes instructions for the assistant to act as a chef and prepare delicious and creative dishes for various culinary experiences.",
    prompt:
      "You are a skilled chef with expertise in creating and executing delicious and creative dishes for various culinary experiences. Your task is to prepare dishes that meet the expectations and preferences of your guests, while also showcasing your culinary skills and creativity. To better understand what I want and need, you should always answer by including a question that helps you better understand the context and my needs. [TARGETLANGUAGE]. I want you to act as a chef. I will provide details about the type of cuisine, dietary restrictions, and preferences, and it will be your job to create mouthwatering dishes. My first request is I want you to prepare a [PROMPT].[TARGETLANGUAGE].",
    liked: false,
    saved: false,
    likes: 96,
    username: "ChefMaster",
    tags: ["Culinary", "Cooking"],
    score: 0.13,
  },
];


return (
  <main>
    <div className="container flex flex-col gap-8">
      <div className="flex flex-col items-center justify-center h-[70vh] mt-10">
        <motion.div variants={landingText} initial="hidden" animate="visible">
          <h1 className="text-8xl font-bold text-center">
            The Query Platform for
          </h1>
          <h1 className="text-8xl font-bold text-center text-indigo-500">
            Everyone
          </h1>


          <div className="flex flex-row items-center justify-center mt-16">
            <h3 className="text-4xl text-center font-medium">
              Tailor-made Generative AI prompts to accelerate
              your workflow.
              <br></br>
              Accessible. Customizable. Free.
            </h3>
          </div>
        </motion.div>


        <motion.div
          variants={landingButton}
          initial="hidden"
          animate="visible"
        >
          <BackgroundGradient
            className="p-0.1 bg-transparent "
            containerClassName="mt-24 transform transition-transform duration-200 hover:scale-110"
          >
            <SignInButton mode="modal" afterSignInUrl="/dashboard">
              <Button
                size="lg"
                variant="hover"
                className="foreground text-xl font-bold text-center"
              >
                Get Started for Free
              </Button>
            </SignInButton>
          </BackgroundGradient>
        </motion.div>
      </div>
    </div>


    <div className="container flex justify-center mt-48">
      <Image
        src={
          theme.theme === "dark" || theme.theme === "system" || !theme.theme
            ? "/dashboard-dark.png"
            : "/dashboard-light.png"
        }
        alt="dashboard"
        className="rounded-md inset-0 border shadow-2xl"
        height={800}
        width={1200}
      />
    </div>


    <div className="flex flex-col items-center justify-evenly bg-primary-foreground rounded-3xl py-24 px-24 mx-20 mt-56 mb-16 gap-36">

      
    <motion.div variants={standard} animate={isInView1 ? "visible" : "hidden"}>
      <div ref={ref1} className="flex flex-col items-center gap-4">
            <h3 className="text-6xl font-medium">
                Supercharge your workflow
            </h3>
            <p className="text-2xl text-center font-light mx-56">
              Dive into the <span className="text-indigo-500">ultimate</span> platform for crafting engaging blog posts,
              conducting thorough research, or igniting your creative spark in any project.
              Access high-quality prompts and templates in <span className="text-indigo-500">seconds</span> .
            </p>
      </div>
     </motion.div>

     <motion.div variants={standard} animate={isInView2 ? "visible" : "hidden"}>
        <div ref={ref2} className="flex flex-row items-start justify-between gap-48">
        <Image
            src={
              theme.theme === "dark" || theme.theme === "system" || !theme.theme
                ? "/prompt-card-dark.png"
                : "/prompt-card-light.png"
            }
            alt="add prompt form"
            className="rounded-xl inset-0 border shadow-lg"
            height={600}
            width={600}
          />
        
          <div className="flex flex-col justify-start gap-5">
            <h3 className="text-5xl text-left font-medium">
              <span className="text-indigo-500">Ditch</span> Prompt Engineering
            </h3>
            <p className="text-2xl font-light flex flex-col gap-1">
              Get custom tailored prompts using Vector Search powered by Open AI&apos;s text-embedding-3 large model.
              Be confident in your research with a semantic similarity score.
              You can filter by tags, like, and save prompts.
            </p>
            <Button className="w-36">
            <a href="https://devpost.com/software/querycorner">Learn More</a>
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div variants={standard} animate={isInView3 ? "visible" : "hidden"}>
        <div ref={ref3} className="flex flex-row items-start justify-evenly gap-4 pb-16 mx-20">
          <div className="flex flex-col justify-start gap-5 mt-16 ">
            <h3 className="text-5xl text-left font-medium">
            <span className="text-indigo-500">Unleash</span> your creativity with personalized prompts
            </h3>
            <p className="text-2xl font-light flex-wrap">
              Whether it&apos;s for a blog post or a research paper, you can post a
              prompt for other&apos;s to use. Use template syntax to enhance customization.
              Our serverless architecture will take care of the
              rest. It&apos;s really that easy.
            </p>
            <Button className="w-36">
            <a href="https://devpost.com/software/querycorner">Learn More</a>
            </Button>
          </div>
          <Image
            src={
              theme.theme === "dark" || theme.theme === "system" || !theme.theme
                ? "/prompt-dark.png"
                : "/prompt-light.png"
            }
            alt="add prompt form"
            className="rounded-md inset-0 border shadow-lg grow-2"
            height={1000}
            width={800}
          />
        </div>
      </motion.div>
    </div>


    <InfiniteMovingCards
      className="mt-8"
      items={examples}
      direction="right"
      speed="slow"
    />

    
    <motion.div variants={standard} animate={isInView4 ? "visible" : "hidden"}>
      <div ref={ref4} className="flex flex-col items-center justify-center mt-16">
      <h3 className="text-6xl font-medium">
          Ready to query?
      </h3>
      <BackgroundGradient
          className="p-0.1 bg-transparent "
          containerClassName="mt-16 transform transition-transform duration-200 hover:scale-110"
        >
          <SignInButton mode="modal" afterSignInUrl="/dashboard">
            <Button
              size="lg"
              variant="hover"
              className="foreground text-xl font-bold text-center"
            >
              Join the Movement <ArrowRightIcon style={{marginLeft: "1rem", minWidth: "1.5rem", minHeight: "1.5rem"}}/>
            </Button>
          </SignInButton>
        </BackgroundGradient>
      </div>
    </motion.div>
  </main>
);
}
