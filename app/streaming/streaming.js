/*import { OpenAI } from "langchain/llms/openai";
import SSE from "express-sse";

const sse = new SSE();

export default function handler(req, res) {
  if (req.method === "POST") {
    const { input } = req.body;

    if (!input) {
      throw new Error("No input");
    }
    // Initialize model

    // create the prompt

    // call frontend to backend

    return res.status(200).json({ result: "OK" });
  } else if (req.method === "GET") {
    sse.init(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}*/

/*import { OpenAI } from "langchain/llms/openai";
import SSE from "express-sse";



const sse = new SSE();

export default function handler(req, res) {
  if (req.method === "POST") {
    const { input } = req.body;

    if (!input) {
      throw new Error("No input");
    }
    // Initialize model
    const chat = new OpenAI({
      streaming: true,
      callbacks: [
        {
          handleLLMNewToken(token) {
            sse.send(token, "newToken");
          },
        },
      ],
    });

    // create the prompt
    const prompt = `Create me a short rap about my name and city. Make it funny and punny. Name: ${input}`;

    console.log({ prompt });
    // call frontend to backend
    chat.call(prompt).then(() => {
      sse.send(null, "end");
    });

    return res.status(200).json({ result: "Streaming complete" });
  } else if (req.method === "GET") {
    sse.init(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

*/

import SSE from "express-sse";
import { OpenAI } from "langchain/llms/openai";

const sse = new SSE();

export default function handler(req, res) {
  if (req.method === "POST") {
    const { input } = req.body;

    if (!input) {
      res.status(400).json({ error: "No input provided" });
      return;
    }

    // Initialize the OpenAI model with the necessary options
    const chat = new OpenAI({
      streaming: true
    });

    // Create the prompt based on the input
    const prompt = `Create me a short rap about my name and city. Make it funny and punny. Name: ${input}`;
    console.log({ prompt });

    // Call the model using the new invoke method
    chat.invoke(prompt, {
      callbacks: {
        onToken: (token) => sse.send(token, "newToken"),
        onEnd: () => sse.send(null, "end"),
        onError: (error) => {
          console.error("Error during streaming:", error);
          sse.send(`Error: ${error.message}`, "error");
        }
      }
    }).catch(error => {
      console.error("Error calling OpenAI:", error);
      res.status(500).json({ error: error.message });
    });

    return res.status(200).json({ result: "Streaming started" });
  } else if (req.method === "GET") {
    sse.init(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
