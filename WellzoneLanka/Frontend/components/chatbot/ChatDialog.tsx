"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "./types";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";

const API_BASE_URL = "http://127.0.0.1:5000"; // Flask API URL

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatDialog({ open, onOpenChange }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_input: input.trim(),
          user_response: "yes",
        }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "bot", content: data.message }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "⚠️ Connection error. Please try again later.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] h-[600px] flex flex-col p-0">
        <DialogTitle className="sr-only">Chat with AI Assistant</DialogTitle>
        <ChatHeader />

        <ScrollArea className="flex-1 p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-md mb-2 ${
                msg.role === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-black self-start"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && <div className="text-gray-500">Typing...</div>}
        </ScrollArea>

        <div className="p-4 border-t">
          <ChatInput value={input} onChange={setInput} onSend={handleSend} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
