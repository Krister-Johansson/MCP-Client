import { openai } from "@ai-sdk/openai";
import {
  experimental_createMCPClient as createMCPClient,
  Message,
  streamText,
} from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    if (process.env.SSE_SERVER_URL) {
      console.log("Connecting to SSE server at:", process.env.SSE_SERVER_URL);

      const client = await createMCPClient({
        transport: {
          type: "sse",
          url: process.env.SSE_SERVER_URL,
        },
      });
      const toolList = await client.tools();

      console.log(
        `Successfully loaded ${toolList.length} tools from SSE server`
      );

      const response = await streamText({
        model: openai("gpt-4o-mini"),
        system: "You are a helpful assistant.",
        messages: messages as Message[],
        tools: toolList,
      });

      return response.toDataStreamResponse();
    } else {
      console.warn("SSE_SERVER_URL not provided, continuing without tools");
    }
  } catch (error) {
    console.error("Failed to connect to SSE server or get tools:", error);
  }
}
