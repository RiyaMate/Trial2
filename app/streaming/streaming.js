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

/*import SSE from "express-sse";
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
*/
/*import SSE from "express-sse";
import { OpenAI } from "langchain/llms/openai";

const sse = new SSE();
let model;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { input, firstMsg } = req.body;

    if (!input) {
      res.status(400).json({ error: "No input provided" });
      return;
    }

    if (firstMsg || !model) {
      console.log("Initializing or resetting model");
      model = new OpenAI({ modelName: "gpt-3.5-turbo", streaming: true });
    }

    console.log({ input });
    try {
      await model.invoke(input);
      res.status(200).json({ result: "Operation complete" });
    } catch (error) {
      console.error("Error during model call:", error);
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    sse.init(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
*/

/*import { OpenAI } from "langchain/llms/openai";
import SSE from "express-sse";

const sse = new SSE();

export default function handler(req, res) {
  if (req.method === "POST") {
    const { input } = req.body;

    if (!input) {
      res.status(400).json({ error: "No input provided" });
      return;
    }

    // Initialize model without specifying callbacks
    const chat = new OpenAI({
      modelName: "gpt-3.5-turbo", // assuming this is the intended model for your application
      streaming: true
    });

    // Create the prompt
    const prompt = `Create me a short rap about my name and city. Make it funny and punny. Name: ${input}`;
    console.log({ prompt });

    // Call the model using the invoke method without callbacks
    chat.invoke(prompt)
      .then((response) => {
        // Handle the full response received from the model
        console.log("Response from the model:", response);
        res.status(200).json({ result: "Streaming complete", output: response });
      })
      .catch((error) => {
        console.error("Error invoking the model:", error);
        res.status(500).json({ error: error.message }); // Send error response if something goes wrong
      });

  } else if (req.method === "GET") {
    sse.init(req, res); // Initialize SSE connection on GET request, though it may not be utilized in this POST context
  } else {
    res.status(405).json({ message: "Method not allowed" }); // Handle unsupported methods
  }
}*/

/*import SSE from "express-sse";
import { OpenAI } from "langchain/llms/openai";

const sse = new SSE();

export default function handler(req, res) {
  if (req.method === "POST") {
    const { input } = req.body;

    if (!input) {
      // Immediately return to stop further execution and prevent hanging the response
      return res.status(400).json({ error: "No input provided" });
    }

    const chat = new OpenAI({
      modelName: "gpt-3.5-turbo",
      streaming: true
    });

    const prompt = `Create me a short rap about my name and city. Make it funny and punny. Name: ${input}`;
    console.log({ prompt });

    chat.invoke(prompt)
      .then((response) => {
        console.log("Response from the model:", response);
        res.status(200).json({ result: "Streaming complete", output: response });
        sse.init(req, res);
      })
      .catch((error) => {
        console.error("Error invoking the model:", error);
        res.status(500).json({ error: error.message });
      });

  } else if (req.method === "GET") {
    // Ensure the SSE initialization also ends the request properly
    sse.init(req, res);
    // You might need to manage the response ending here if SSE does not handle it by default
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
*/
/*import SSE from "express-sse";
import { OpenAI } from "langchain/llms/openai";

const sse = new SSE();

export default function handler(req, res) {
  if (req.method === "POST") {
    const { input } = req.body;

    if (!input) {
      // Ensure to return after sending the response to prevent further execution
      return res.status(400).json({ error: "No input provided" });
    }

    const chat = new OpenAI({
      modelName: "gpt-3.5-turbo",
      streaming: true
    });

    const prompt = `Create me a short rap about my name and city. Make it funny and punny. Name: ${input}`;
    console.log({ prompt });

    // If streaming results to the client is intended, initiate SSE
    if (req.headers.accept === 'text/event-stream') {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');

      chat.invoke(prompt).then(() => {
        sse.send(res, "end");
      });

      // Stream data via SSE
      chat.invoke(prompt, {
        onToken: token => {
          res.write(`data: ${JSON.stringify({ token })}\n\n`);
        },
        onEnd: () => {
          res.write('event: end\ndata: null\n\n');
          res.end();
        },
        onError: error => {
          res.write(`event: error\ndata: ${JSON.stringify({ error: error.message })}\n\n`);
          res.end();
        }
      }).catch(error => {
        console.error("Error invoking the model:", error);
        res.status(500).json({ error: error.message });
      });
    } else {
      // Normal API request handling
      chat.invoke(prompt)
        .then((response) => {
          console.log("Response from the model:", response);
          res.status(200).json({ result: "Streaming complete", output: response });
        })
        .catch((error) => {
          console.error("Error invoking the model:", error);
          res.status(500).json({ error: error.message });
        });
    }
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
      throw new Error("No input");
    }
    // Initialize model
    const chat = new OpenAI({
      modelName: "gpt-3.5-turbo",
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
    chat.invoke(prompt).then(() => {
      sse.send(null, "end");
    });

    return res.status(200).json({ result: "Streaming complete" });
  } else if (req.method === "GET") {
    sse.init(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}