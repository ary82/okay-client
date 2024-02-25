# OkayChat

A Public Messaging app with quirks, written in JavaScript.

### Quirks

<ul>
    <li>Effortlessly acknowledge messages with a single keystroke. Pressing Enter with an empty message will automatically send the text "Ok"!</li>
    <li>Click on <i>Generate with AI</i> to send an AI generated message based on the last five messages of your conversation</li>
</ul>

### Front-End

The Front end for this project is written in React, while utilising the features of various libraries such as:

<ul>
    <li>Redux toolkit for state management</li>
    <li>Axios for API requests</li>
    <li>TailwindCSS for Styling</li>
</ul>

Hosted at: [https://okaychat.vercel.app](https://okaychat.vercel.app)

### Back-End

The Back end For this project is written in JavaScript, while utilising:

<ul>
    <li>Socket.io library for instant messaging</li>
    <li>MongoDB database for storing users, and messages and WebSocket rooms</li>
    <li>Calls to Google Gemini for Automatic Message Generation</li>
    <li>PassportJS for implementing User Authentication</li>
</ul>

#### Note:

The [Back End](https://github.com/ary82/okay-api) for this project is not hosted publicly and you would need to host it on your local machine or on a Cloud Yourself to use it. You can do so by:

```sh
# Clone the repo and install dependencies
git clone https://github.com/ary82/okay-api
cd okay-api
npm i
```

You would now need to setup the Env variables for this project. The following are the variables you would need to set up.

```
MONGO_URL = <Database_url>
SECRET = <Random_string_for_sessions>
GEMINI_KEY = <Gemini_API_key>
```

Now start the server by:

```sh
npm start
```

[https://okaychat.vercel.app](https://okaychat.vercel.app) would now be usable.
