// export const getBotResponse = async (userMessage) => {
//   try {
//     // Simulate Flash API delay
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({
//           bot: `You said: "${userMessage}". This is a Flash API response.`,
//         });
//       }, 1000);
//     });
//   } catch (error) {
//     return { bot: "Sorry, something went wrong." };
//   }
// };



// api.js
// Call backend chatbot API
export const getBotResponse = async (userMessage) => {
  try {
    const response = await fetch("http://localhost:5000/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userMessage }),
    });
    if (!response.ok) {
      throw new Error("Failed to get response from backend");
    }
    const data = await response.json();
    return { bot: data.text };
  } catch (error) {
    return { bot: "Sorry, something went wrong." };
  }
};
`;

    const result = await model.generateContent(prompt);
`
