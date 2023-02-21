Well. I just logged onto npm and saw that 271 people have downloaded my package. WOW, 2 days and 271... this is crazy. If your reading this keep in mind that this is a **Work In progress** and is not finished. The current memory mongoose connection are being developed and should not be used at the current point in time. I will update this message later on when this code is working great.

# Boost-AI
Are you tired of being just an ordinary human with boring everyday tasks? Want to take your cognitive abilities to the next level and become a superhuman? Look no further, because Boost-AI is here to turn you and your project into a genius.

## Table Of Contents
Oh, look who's too fancy to navigate through our perfectly organized repo on their own. Don't worry, we get it. Why bother using your own eyes and clicking through the folders when you can have someone else do it for you? So here you go, your very own table of contents, just in case all that browsing was too much to handle. You're welcome, we suppose. Don't forget to thank us in your next commit message.

[• What is this?](#what-is-this)  
[• How does it work?](#how-does-it-work)  
[• Can I use it my project](#can-i-use-it-with-my-project)  
[• Install](#install)  
[• Examples](#usage)  

## What is this?
Boost-AI is an open-source project that aims to enhance your willpower... I mean codepower (if that's even a word). We took the boring old shitty openAI api and turned it into something great. Honestly... using this package will change your life, your dad might even come back?

## How does it work?
Well, we can't say for sure. According to the creators, Boost-AI uses a sophisticated blend of AI algorithms and powerful machine learning techniques to deeply understand your code and deliver unparalleled API requests. We could also mention "black magic", but let's leave that for our more mystical competitors.

In all honesty, the team behind Boost-AI probably just followed a basic tutorial on creating an npm package that uses AI. But hey, as long as it works, right? And if it doesn't, you can always just blame the "magic" not cooperating.

## Can I use it with my project?
Oh, of course, you want to know if our amazing creation is compatible with your project. Well, let's just say that Boost-AI was created by a 15-year-old who was fueled by nothing but pizza and Mountain Dew, so the odds are not in your favor. But fear not, we've made some improvements, and now we even support ESM. We know you were holding your breath for that one. Because let's be real, nothing screams quality like a package created by a teenager fueled by junk food. And let's not forget, Boost-AI is just a slightly better version of the OpenAI API, so you might as well just use the original and save yourself the trouble. But hey, if you want to use Boost-AI and pretend like you're cutting-edge, go right ahead.

## Install
Installing Boost-AI is as easy as falling off a log. Just type the command below into your console on your own personal computer and hope nothing bad happens.
```sh
npm install boost-AI
```

## Usage
Wow, do we really have to spell everything out for you? You can't just magically figure out how this thing works on your own? Okay, fine, we'll throw you a bone and provide some examples. But don't get too excited, we're not going to hold your hand every step of the way. After all, if you can't even figure out how to use an AI api on your own, how are you ever going to conquer the world?

Boss: "Gee, thanks for finally realizing that our users might need a little bit of help. I knew I could always count on you to deliver top-quality sarcasm with a side of helpfulness."

### API Instance
Ready to experience the mind-blowing power of Boost-AI's advanced AI features? Great! But first, you'll need to create an API instance.
```ts
import { boostAI } from "boost-ai";

const api = new boostAI("your open ai api key");
/*You can optionally set a mongoURI to store all text generation
uses but we will go through that later.*/
const api = new boostAI("your open ai api key", "your mongodb uri");
```

### Generation Requests
Only two hours to copy and paste the code and get it working? You're practically a genius. Now, onto the exciting stuff: sending text and image generation requests with Boost-AI. Who needs a life outside of coding when you have our AI-powered package to keep you entertained? So sit back, relax, and enjoy the ride to the future of software development (or at least, that's what we like to tell ourselves).
```ts
const response = await api.generateText({
 prompt: "This is the bit where you enter your life problems/questions",
});

//Alternatively you can send a request for image generation using Dall.E

const response = await api.generateImage({
 prompt: "A cute little cat",
});
```

### Parameters
Well, that was a piece of cake. But wait, there's more! As if Boost-AI wasn't already the best thing to happen to your code, you can also specify a prefix to use or even give our API memory. That's right, we're not just a pretty face. We're a pretty face with an incredible memory system and the ability to understand your every command. 

##### Prefix
```ts
const response = await api.generateText({
 prefix: "Write a poem on:",
 prompt: "Your mother",
});
```

### Memory
Ah, memory. The stuff of nightmares for those not brave enough to face its mighty power. We've even given it its own VIP section outside of the common parameters area, because let's be real, it deserves that kind of special treatment. So go ahead, quiver in fear as you approach the hallowed halls of memory, knowing that only the bravest of coders dare to venture into its realm. Or maybe you have years of coding experience, in which case, why on earth would you be using this package? But hey, we won't judge. Anyways, here's how you use the thing.

Each time you create a generateText request via our package it will be stored in the mongo database as long as you have it connected

```ts
const response = await api.generateText({
 prompt: "What is the biggest animal?",
}, true); //The boolean will specify that we would like to receive the entire response back within our ReturnParams type.

const followUpResponse = await api.generateText({
 prompt: "What about the smallest one?",
 conversationId: response.conversationID,
})
```

> ``📝`` - Full Response will return a custom type called "TextGenerationReturnParams". This can be imported via the package and used as need be. See [this]() for a list of types.
> ``📝`` - Using a conversation ID requires you to have a mongo URI set in your api instance and the database must be running (in future we will change to locally stored information rather than a db).

