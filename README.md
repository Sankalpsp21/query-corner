# QueryCorner

## Inspiration
The inspiration for our project, QueryCorner, comes from our experience as students and software developers getting low-quality answers from ChatGPT. Typing out a detailed prompt can be hard and annoying but is often necessary for complex questions or questions requiring a lot of context. We saw an opportunity to create a tool that would empower people to accelerate their research and workflow. Try it out at [QueryCorner](https://query-corner-one.vercel.app/).


## What it Does
 Query Corner is a generative AI prompt-sharing / social platform where people can share their prompts and prompt templates. Users can attach tags to their prompts (React, Finance, Health, etc) to help with filtering, and we use embeddings and vector search to implement a robust semantic search. Additional features include search history, saved prompts, likes, and as a stretch goal, comment sections. With QueryCorner, the perfect prompt is always one search away.

## How we built it
We built our application using a multitude of services/frameworks/tools:
- React.js for the client frontend
- NextJS for server-side rendering, file routing, and improved SEO
- Tailwind for styling
- ShadCN, Framer Motion, and Acernity for animations and UI components
- Convex for data storage and our backend server
- OpenAI's Text-embedding-3-small embedding model
- Clerk for OAuth

## Challenges We Ran Into
- Learning the basics of NextJS -- this was the first time any of us had used NextJS and it required a lot of learning on everyone's part.
- Finding time to work as a team -- we all have busy lives as college students, and finding time to plan how to work asynchronously brought some unique challenges.
- Learning how to use ShadCN -- this is a different type of component library as compared to DaisyUI or Chakra

## Accomplishments that we're proud of
- Finishing our project and getting it working! We were honestly surprised at the progress we made each day and are super proud of the end product.
- Learning a ton of new technologies

## What we learned
- Used NextJS for the first time
- Used ShadCN for the first time
- Learned concepts regarding embeddings, 
- Worked together as a team for the first time

## What's next for QueryCorner
- Implement pagination to improve loading time and site performance 
- Add options to delete posts.
- Add the option to view other's profiles.
- Allow users to submit posts without logging in.


## Get started locally

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [`convex`](https://github.com/get-convex/templates/tree/main/template-nextjs-clerk-shadcn).

First install node packeges:

```bash
npm i 
#or
npm install
```

Then, create a `.env.local` file with your Clerk API keys.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Convex, take a look at the following resources:

- [Convex Documentation](https://docs.convex.dev/home) - learn about Convex features and tutorials.

To learn more about Clerk, take a look at the following resources:

- [Clerk Documentation](https://clerk.com/docs) - learn about Clerk Authentication.

To learn more about Shadcn UI, take a look at the following resources:

- [Shadcn UI Documentation](https://shadcn.com/docs) - learn about Shadcn UI components and styles.


