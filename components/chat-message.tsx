import { cn } from "@/lib/utils";
import { Message } from "ai";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Card } from "./ui/card";

import { BarChart4, Bot, Code, ImageIcon, User } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  // Parse content if it's a JSON string
  const [parsedContent, setParsedContent] = useState<any>(() => {
    if (typeof message.content === "string") {
      try {
        // Check if the content is a JSON string
        const parsed = JSON.parse(message.content);
        if (typeof parsed === "object") {
          return parsed;
        }
        return null;
      } catch (e) {
        // Not a JSON string, which is fine
        return null;
      }
    }
    return null;
  });

  // Determine if we have special content types
  const hasToolResponse = parsedContent?.type === "tool_response";
  const hasImage = parsedContent?.type === "image";
  const hasGraph = parsedContent?.type === "graph";
  const hasCode =
    typeof message.content === "string" &&
    (message.content.includes("```") || parsedContent?.type === "code");

  // Extract code blocks if present
  const codeBlocks =
    hasCode && typeof message.content === "string"
      ? extractCodeBlocks(message.content)
      : [];

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "flex gap-3 max-w-[85%]",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center h-8 w-8 rounded-full",
            isUser ? "bg-primary text-primary-foreground" : "bg-muted"
          )}
        >
          {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        </div>

        <Card
          className={cn(
            "p-3 shadow-sm",
            isUser ? "bg-primary text-primary-foreground" : "bg-card"
          )}
        >
          {/* Tool Response */}
          {hasToolResponse && (
            <div className="space-y-2">
              <div className="flex items-center text-sm font-medium">
                <Code className="h-4 w-4 mr-1" />
                Tool: {parsedContent.tool}
              </div>
              <div className="bg-muted p-2 rounded text-sm overflow-x-auto">
                {typeof parsedContent.result === "object" ? (
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(parsedContent.result, null, 2)}
                  </pre>
                ) : (
                  <pre className="whitespace-pre-wrap">
                    {parsedContent.result}
                  </pre>
                )}
              </div>
            </div>
          )}

          {/* Image */}
          {hasImage && (
            <div className="space-y-2">
              <div className="flex items-center text-sm font-medium">
                <ImageIcon className="h-4 w-4 mr-1" />
                Image
              </div>
              <img
                src={parsedContent.url || "/placeholder.svg"}
                alt={parsedContent.alt || "AI generated image"}
                className="rounded max-w-full max-h-[300px] object-contain"
              />
            </div>
          )}

          {/* Graph */}
          {hasGraph && (
            <div className="space-y-2">
              <div className="flex items-center text-sm font-medium">
                <BarChart4 className="h-4 w-4 mr-1" />
                Graph
              </div>
              <div className="bg-muted p-2 rounded">
                {/* Render graph based on data */}
                <pre className="text-xs overflow-x-auto">
                  {JSON.stringify(parsedContent.data, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Code Blocks */}
          {hasCode && codeBlocks.length > 0 ? (
            <div className="space-y-3">
              {codeBlocks.map((block, index) => (
                <div key={index} className="space-y-1">
                  {block.text && (
                    <div className="whitespace-pre-wrap mb-2">{block.text}</div>
                  )}
                  {block.code && (
                    <div className="rounded overflow-hidden text-sm">
                      <div className="bg-gray-800 text-gray-200 px-3 py-1 text-xs">
                        {block.language || "code"}
                      </div>
                      <SyntaxHighlighter
                        language={block.language || "javascript"}
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: "0 0 4px 4px" }}
                      >
                        {block.code}
                      </SyntaxHighlighter>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Regular text message
            <div className="whitespace-pre-wrap">
              {typeof message.content === "string"
                ? message.content
                : JSON.stringify(message.content)}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// Helper function to extract code blocks from markdown
function extractCodeBlocks(content: string) {
  const blocks = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      blocks.push({
        text: content.substring(lastIndex, match.index).trim(),
        code: null,
        language: null,
      });
    }

    // Add code block
    blocks.push({
      text: null,
      code: match[2],
      language: match[1] || null,
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after last code block
  if (lastIndex < content.length) {
    blocks.push({
      text: content.substring(lastIndex).trim(),
      code: null,
      language: null,
    });
  }

  return blocks;
}
