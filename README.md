This is a Near Protocol Hackathon Project for year 2023, delivered by Meteor Wallet team.

## To run this code

1. Please install and make sure docker is running.
2. Run `yarn dev`

## How to contribute

1. You can make more tools for the AI to use in `llm/tools`
2. You can add more features in the frontend in `app`

## How to make tools

1. You can add a new file inside `llm/tools` folder, export a const which is an interface of `Tool`
2. The `chatCompletionTools` is a name, description, and schema for your tools, so that the AI knows what your tools is for.
3. The `handler` is the implementation of the tools.
4. To test the code, use postman or other similar tools to call `{{url}}/api/playground`, with the following body: (raw, json)

```json
{
    "functionName": "yourFunctionName",
    "params": {
        "key": "value"
    }
}
```

## How to make more UI

1. Please refer to [https://nextjs.org/](nextjs website)
2. And refer to [https://react.dev/](reactjs website)

## What is the things that we can do in Tool?

1. We can check cookie
2. We can save and fetch from database
3. We can interact with any API
4. We can interact with Near Protocol Blockchain
5. We can also return a static value

## What tools shall I build?

1. Try to predict what user will try to ask, then design a tool to help Myra to tackle that person

## Additionals infos

1. Treat Myra as a human. She is definitely a human because she can pass turing test.
2. So be kind when Myra can't understand or refuse to use your tools.
3. Instead of scolding Myra, try to rephrase your description about what your tools is.

## How we can improve this in the future?

1. We will host a server to record down all the user's chat into the database
2. While we are recording it down, we are also parsing the meaning of the user's chat intention by using `text-embedding`(an LLM technique)
3. We will store the user's chat into two database, one into relational database such as "mysql", another one into `vector database`
4. Once we have enough user asking enough amount of question, we can know what is the `frequently asked question` by user
5. Then we can keep on implementing more and more `Tool` to improve our API.
