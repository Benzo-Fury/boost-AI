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

#### Text Generation
Sending text generation requests is as easy as taking candy from a baby. Just give the package a prompt, sit back, and watch it work its magic. It's like having a personal writing assistant that never gets tired, grumpy, or distracted by cat videos.  
```ts
const response = await api.generateText({
 prompt: "This is the bit where you enter your life problems/questions",
});
```

##### Response Modification (Return Full Response)
Ah, yes. The thrill of the unknown. By default, our package will only give you the answer string that was generated, because we like to keep things exciting. But if you're feeling daring and want to see the full response, you can specify that with the "returnFullResponse" special section. Just set it to "true" and voila! You'll get all the juicy details of the response. Of course, if you're not into that kind of thing, you can just stick with the default and live on the edge like the rest of us. Oh yeah this is how you do it:
```ts
const response = await api.generateText({
 prompt: "This is the bit where you enter your life problems/questions",
}, true); // <<< see how it says true
```
What will this return you may ask? Thats a great question. Our life changing package will return a custom type that looks a little like this:

```ts
{
  openAIResponse: AxiosResponse<CreateCompletionResponse>;
  conversationID: string;
  time: string;
}
```

You can import this type from our package for all your devily desires if you need it:
```ts
import { TextGenerationReturnParams } from 'boost-AI'
```

##### Prefix And Parameters
But wait, there's more! As if Boost-AI wasn't already the best thing to happen to your code, you can also specify a prefix to use or even give our API memory. That's right, we're not just a pretty face. We're a pretty face with an [incredible memory system](#memory) and the ability to understand your every command. 

Aren't we getting fancy with our chatbot prompts? Who needs simple prompts like "hello" or "how are you" when you can generate a poem about your dear old mother with just two words? But fear not, dear user, for Boost-ai has your back with our fancy-schmancy prefix parameter. Now you don't even have to bother typing out those extra two letters, because we all know how strenuous that can be. Just sit back, relax, and let Boost-ai do the work for you. After all, who needs the satisfaction of doing things manually when you have a machine to do it for you, right?
```ts
const response = await api.generateText({
 prefix: "Write a poem on:",
 prompt: "Your mother",
});
```
Wondering where the rest of the parameters are? Yeah us too! Honestly I think we lost where they were... wait nevermind there right here:

Our parameters are apart of a fancy type called TextGenerationParams. These params are all listed below:

| Name        | Type        | Optional      |
| :---        |    :----:   |          ---: |
| prompt      | String      |    ✘          |
| prefix      | String      |    ✓          |
| model       | LanguageModel |    ✓        |
| conversationID | String   |    ✓          |
| maxTokens   | Interger    |    ✓          |
| creativity  | Interger (0.0 - 1.0) |     ✓ |


#### Image Generation
You want to generate images? Ooh, how fancy! I suppose it's all fun and games until you accidentally create a masterpiece of Fat Obama wielding a bazooka. But don't fret, dear user, because image generation with Boost-AI is smarter than your average bear. It has built-in anti-inappropriate image properties, which means it'll throw an error and reject any attempts to generate anything too racy. So, if you're feeling like playing with fire, be prepared to face the wrath of an "Inappropriate Prompt...DallE rejected" error message. Don't say we didn't warn you!

```ts
const response = await api.generateImage({
 prompt: "A cute little cat",
});
```

### Memory
Ah, memory. The stuff of nightmares for those not brave enough to face its mighty power. We've even given it its own VIP section outside of the common parameters area, because let's be real, it deserves that kind of special treatment. So go ahead, quiver in fear as you approach the hallowed halls of memory, knowing that only the bravest of coders dare to venture into its realm. Or maybe you have years of coding experience, in which case, why on earth would you be using this package? But hey, we won't judge. Anyways, here's how you use the thing.

Our package stores every generateText request in a connected MongoDB database, unless you haven't set a MongoDB URI, in which case it'll just shrug and move on without throwing any errors.

#### Generate Text Followups (REAL MEMORY)
Wow, isn't it just amazing how you can use the conversation ID (if you even remember it) to create follow up requests for previous text requests? It's almost like technology is advancing every day or something. And get this - all you have to do is specify the conversation ID within the new request! Mind-blowing, isn't it? Who would have thought that following up on a conversation could be so simple?
```ts
const response = await api.generateText({
 prompt: "What is the biggest animal?",
}, true); //The boolean will specify that we would like to receive the entire response back as stated above.

const followUpResponse = await api.generateText({
 prompt: "What about the smallest one?",
 conversationId: response.conversationID || "", // you only need the or "" statement if your using typescript
})
```

If you're using TypeScript, you might run into an error that says "Property 'conversationID' does not exist on type 'string'." How fun! But don't worry, we've got a super simple solution for you. Just add an if statement above to check that the response isn't a string. No biggie! Of course, we'll fix this issue on our end soon enough...but hey, why not add a little extra work to your plate in the meantime, right?

#### Searching

Ah, so you've misplaced the conversation ID from a test generation request from 7 days ago? No worries, our search function has got you covered. Simply provide your search criteria, and let our powerful search feature do the rest. You can even use 2 different parameters to narrow down your results and find exactly what you're looking for.
```ts
const searchResult = await api.search({
 pointer: 'prompt',
 pointerType: PointerTypeEnum.prompt;
});
```

Oh boy, you're in luck! Our 3 pointer types are here to help you track down those oh-so-important conversations you've stored in the database. It uses not one, not two, but three different pointer types to filter your search: id, prompt, and response. How exciting!

**ID** - The "id" pointer is just a fancy way of referring to the unique identifier generated for each request. So, if you happen to know that pesky little ID, you can use it to find a specific conversation. Ain't technology grand?

**Prompt** - The "prompt" pointer is simply the input prompt you used to generate the response. Now, you can use this to search for a specific conversation by the prompt used. I mean, who needs Google when you have our search function, right?

**Response** - Last but not least, the "response" pointer refers to the actual response generated by the AI. This is particularly useful when you want to search for a specific conversation based on the response it generated.

So, let's say you wanted to find a document with the response "The blue whale is the largest animal." Well, aren't you fancy! You can use the search function like this, specifying the "response" pointer to filter your search results:
```ts
const searchResult = await api.search({
 pointer: 'The blue whale is the largest animal.';
 pointerType: PointerTypeEnum.response;
});
```
> ``📝`` - Using the search function requires you to have a mongo URI set in your api instance and the database must be running.


Oh, you're wondering why you should use our search function instead of the mongoose .findOne() function? That's a really great question, and honestly, we have no idea. But hey, why not use it anyway, just to be safe? You never know when we might decide to swap to locally stored information without a database in the future. And you wouldn't want your code to break when we make that update, would you? So just use the search function mate.

Oh, one more thing to keep in mind! If you don't use a conversation ID, you might get more than one document in return. Shocking, I know! But don't worry, it's not a bug, it's a feature. You'll get an array of all the documents, because why have one when you can have many, right? Just remember this when searching by prompt or response, because you might have to do some extra work to find the one you're looking for. Happy searching!

Great now we have finished the huge read me file. L. Have fun
