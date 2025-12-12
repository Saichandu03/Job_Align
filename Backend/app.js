// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cron = require('node-cron')
const axios = require('axios')
const fetch = require('node-fetch')

dotenv.config();

const app = express();

// Middleware
app.use(cors());  
app.use(bodyParser.json());
app.use(express.static('public'));


// DB Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


// this is the dummy commment to test the git commit

var userRouter = require("./src/routes/userRouter");
var jobsRouter = require("./src/routes/jobsRouter");
var resumeRouter = require("./src/routes/resumeRouter");

var dreamRoleRouter = require('./src/routes/dreamRoleRouter')
var chatbotRouter = require('./src/routes/chatbotRouter')


app.use('/api', userRouter);
app.use('/api', jobsRouter);
app.use('/api', resumeRouter);
app.use('/api', dreamRoleRouter);
app.use('/api', chatbotRouter);

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to JobAlign!');
});


// async function listModels() {
//   const key = process.env.GOOGLE_GENAI_KEY_2;
//   const url = `https://generativelanguage.googleapis.com/v1/models?key=${key}`;

//   const res = await fetch(url);
//   if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`);

//   const data = await res.json();
//   console.log(data);
// }
// listModels().catch(console.error);


// Put this in a helper file or directly in getJobDetails
// Node 18+ has global fetch so no node-fetch needed.

// const API_KEY = process.env.GOOGLE_GENAI_KEY_2; // or set in env
// const MODEL = "models/gemini-2.5-flash";   // pick one from your ListModels output

// async function generateWithGemini(prompt) {
//   const url = `https://generativelanguage.googleapis.com/v1beta/${MODEL}:generateContent?key=${API_KEY}`;
//   // alternative: use header "x-goog-api-key": API_KEY instead of key= query param

//   const body = {
//     // follow the "contents" + "parts" pattern from docs
//     contents: [
//       {
//         role: "user",
//         parts: [
//           { text: prompt }
//         ]
//       }
//     ],
//     // optional generation params you can tune:
//     // temperature: 0.7, topP: 0.95, maxOutputTokens: 512
//   };

//   const res = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });

//   if (!res.ok) {
//     // capture details for debugging
//     const errText = await res.text();
//     throw new Error(`generateContent failed: ${res.status} ${res.statusText} - ${errText}`);
//   }

//   const json = await res.json();
//   // The structure can include choices, outputs, etc. Extract text from the response:
//   // Inspect json to confirm exact fields. Example response often contains generated text in
//   // json.candidates[0].content[0].text or similar—log to verify in your env.
//   return json;
// }

// console.log("Gemini generation result:");
// generateWithGemini("Write a short poem about the sea.")
//   .then(result => console.log(JSON.stringify(result, null, 2)))
//   .catch(err => console.error(err));





// Server start
const port = process.env.PORT || 5000;
app.listen(port , function(){
  console.log('Server is Running at  '+'http://localhost:'+ port);
});
