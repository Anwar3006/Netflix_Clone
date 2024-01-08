# Netflix Cloning Tutorial Progress Log

## Overview

- **Tutorial Source:** [Full Stack Netflix Clone in React, Tailwind CSS, Next.JS, Prisma, MongoDB, NextAuth & Vercel (2023)](https://youtu.be/mqUN4N2q4qY?si=AU7Gn8spw5-rRTCF)
- **Duration:** Wednesday 3rd January, 2024 - 4:04pm ---- [End Date and Time]

---

## Session 1: [First 20 Minutes]

### Date and Time: [Date and Time]

#### Tasks Completed:

- [x] SetUp Next App with > _npx create-next-app netflix-clone_
  - Install Tailwind with: _npm install -D tailwindcss_ (completed)
  - Configure globals.css according to Tailwind's setup guide (completed)
- [x] Create /auth page and set background to images/hero.png
- [x] Create Input component along with all styling in tailwind (completed)
- [x] Use Input component in /auth page to create Sign Up form. It is very responsive, we should stick to this for all our Forms in the future. [Auth Page](./pages/auth.tsx)(completed)

#### Notes:

- Observations during this session:
  - To create a responsive container:
    - Use `flex` then `justify-center` to center card horizontally
    - Create an inner div and give it a `padding` then use `self-center` to vertically center the children of this div, then make the `width full` so the children can take up 100% of the width, in large screens set the `width to be 2/5` of the parent div(the div above this div), the parent div has no width, it is from the leftmost edge to the rightmost edge of the screen so we set 2/5 in order to get a width for this div(inner div) and set a `max width` so that we can limit how much the div can expand.
    - Within the inner div:
      - Create your header text
      - Create a div, make it `flex`, `flex-col` and add a gap to space the children vertically.
        - Within this div youll add your [Input component](components/Input.tsx)
    - Add your button

---

## Session 2: [Next 20 Minutes]

### Date and Time: [Date and Time]

#### Tasks Completed:

- [x] Set toggle for Login or Sign up using a state variable and useCallback hook then use it inside the span on onClick event
- [ ] Install Prisma with: `npm i -D prisma` and `npm i @prisma/client`, then `npx prisma init`

#### Notes:

- Observations during session:
  - With regards to the Prisma client, we have to set up some configuration to ensure some optimizations because in Production mode there arent any Hot Reloads, because of this PrismaClient will not be recreated after every hot reload, like in Development mode. To ensure that the same instance of PrismaClient is used for every request, we have to create the instance and assign it to global.prismadb:
    - Within this file we import PrismaClient from @prisma/client.
    - then create a variable called client, then assign global.prismadb or new PrismaClient(): this checks if there already exists an instance of PrismaClient as the prismadb variable, if this varibale isnt there in global then no previous instance of PrismaClient exits then a new instance is created.
    - if in process.env.NODE_ENV === "production" then assign client to global.prismadb
    - Export default client
  - global.prismadb will throw an error because Typescript says it isnt typed properly. So we create a file called global.d.ts and populate it with some data:
    - declare global, within create a namespace called globalThis, within create your var called prismadb and type it as PrismaClient

---

## Session 3: [Next 20 Minutes]

### Date and Time: [Date and Time]

#### Tasks Completed:

- [ ] Task 7
- [ ] `npm i next-auth` and `npm i bcrypt`
- [ ] Go to /api and create a folder called /auth then within it a file called [...nextauth].ts, import NextAuth and create and export a NextAuth instance.

#### Notes:

- Observations during session:
  - For the NextAuth instance youll need some guidelines on how to go about it, for the providers go here for a guide on using Credentials as a provider: [Credentials](https://next-auth.js.org/providers/credentials). Then youll need to use your prismadb inside the authorize async function, this function will take the email and password and check for their availability inside the credentials object, throws an error if absent, then we use the `credentials.email` to find a user in our database, we use prismadb for this, if the user doesn't exist we throw an error, if it exists we use `bcrypt.compare` to compare the `credentials.password` with the password we get from database, then we return the user this function. We then set the page we want NextAuth to work with by assigning the page to either Sign in or Sign Up within the pages object, then we set debug to work only when `process.env.NODE_ENV === "development"`, then set the sessions object to use strategy: jwt, then create two secrets in our `.env` file to store the NextAuth JWT secret and the NextAuth secret.

---

## Session 4: [Next 20 Minutes]

### Date and Time: [Date and Time]

#### Tasks Completed:

- [x] Create a register.ts file inside /api which will handle user registration. User Registration Api route
- [x] Create register function inside auth.tsx, `npm i axios` that is what we will be using for api calls. Add the function as an event ttaht will be triggered when users click on the Sign-Up button
- [x] Import signIn from `next-auth/react`, create a login function

#### Notes:

- [Any issues encountered and solutions]

---

## Session 5: [Last 20 Minutes]

### Date and Time: [Date and Time]

#### Tasks Completed:

- [ ] `npm i react-icons` and add Google and Github icons to auth file.
- [ ] Go to ...nextauth.ts and add Google and Github providers. then go to .env and store the secrets there. `npm i @next-auth/prisma-adapter` then import PrismaAdapter from it inside your ...nextauth.ts file. after debug, add adapter: PrismaAdapter(prismabd)
- [ ] To get a Github secret, go [here](https://github.com/settings/developers) to register your app. Create and copy the ClientId and Secret to your .env file. Then go to the Github icon's surrounding div and create an onClick event that will call signIn("github", {callback: "/"}). After testing it, go to your mongodb, under Accounts collections, youll see a new account. Essentially, youll need to implement the fields within this Account collection in order to persist data from any Oauth trigger because NextAuth will use this Account collection to store.

#### Notes:

- [Final thoughts and summary]

---

## Conclusion

- **Overall Progress:**
  - [Percentage or summary of tasks completed]
- **Challenges:**
  - [List any challenges faced during the entire tutorial]
- **Next Steps:**
  - [Any additional tasks or improvements planned]

---

Feel free to copy this template and use it to document your progress at each 20-minute interval. Adjust the sections as needed, and make sure to include specific details about the tasks completed, challenges faced, and any notes or observations. This will serve as a comprehensive log of your journey through the tutorial.
