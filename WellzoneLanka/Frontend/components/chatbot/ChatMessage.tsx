"use client";

interface ChatMessageProps {
  role: "user" | "bot";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div
      className={`p-2 rounded-md mb-2 ${
        role === "user"
          ? "bg-blue-500 text-white self-end"
          : "bg-gray-200 text-black self-start"
      }`}
    >
      {content}
    </div>
  );
}
