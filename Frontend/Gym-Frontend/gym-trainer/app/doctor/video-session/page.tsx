"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, VideoIcon, VideoOff, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
}

export default function VideoSessionPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");
  const { toast } = useToast();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [message, setMessage] = useState("");
  const [sessionData, setSessionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "John Smith",
      content: "Hello! How are you feeling today?",
      timestamp: new Date(new Date().setHours(10, 1)),
      isUser: false,
    },
    {
      id: "2",
      sender: "You",
      content: "Hi John! I'm good, ready for our session.",
      timestamp: new Date(new Date().setHours(10, 2)),
      isUser: true,
    },
    {
      id: "3",
      sender: "John Smith",
      content: "Great! Let's start with some warm-up exercises.",
      timestamp: new Date(new Date().setHours(10, 3)),
      isUser: false,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Fetch session data if sessionId is provided
    const fetchSessionData = async () => {
      if (sessionId) {
        try {
          const response = await fetch(
            `/api/video-session?sessionId=${sessionId}`
          );
          if (response.ok) {
            const data = await response.json();
            setSessionData(data.session);
          } else {
            toast({
              title: "Error",
              description: "Failed to fetch session data",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error fetching session data:", error);
          toast({
            title: "Error",
            description: "An error occurred while fetching session data",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId, toast]);

  useEffect(() => {
    // Simulate video stream with a placeholder
    const getVideoStream = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
        toast({
          title: "Camera Access Error",
          description:
            "Could not access your camera or microphone. Please check permissions.",
          variant: "destructive",
        });
      }
    };

    getVideoStream();

    return () => {
      // Clean up video stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [toast]);

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !isMicOn;
      });
    }
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !isVideoOn;
      });
    }
  };

  const endCall = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    window.location.href = "/gym-trainer";
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "You",
        content: message,
        timestamp: new Date(),
        isUser: true,
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      // Simulate trainer response
      setTimeout(() => {
        const trainerResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: "John Smith",
          content: "I see. Let's continue with the next exercise.",
          timestamp: new Date(),
          isUser: false,
        };
        setMessages((prev) => [...prev, trainerResponse]);
      }, 2000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const trainerName = sessionData?.appointment?.trainer || "John Smith";

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex items-center mb-8">
        <Link href="/gym-trainer" className="mr-4">
          <Button variant="outline">Back to Appointments</Button>
        </Link>
        <h1 className="text-3xl font-bold">Video Session</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="bg-muted p-2 h-[500px] relative">
            <div className="bg-black h-full rounded-md flex items-center justify-center">
              {isVideoOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Video off"
                    className="opacity-50"
                  />
                </div>
              )}
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                Live Session with {trainerName}
              </div>
              <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-md overflow-hidden border-2 border-primary">
                <video
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src="/placeholder.svg?height=100&width=150"
                />
              </div>
            </div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <Button
                variant={isMicOn ? "default" : "destructive"}
                size="icon"
                className="rounded-full h-12 w-12"
                onClick={toggleMic}
              >
                {isMicOn ? <Mic /> : <MicOff />}
              </Button>
              <Button
                variant={isVideoOn ? "default" : "destructive"}
                size="icon"
                className="rounded-full h-12 w-12"
                onClick={toggleVideo}
              >
                {isVideoOn ? <VideoIcon /> : <VideoOff />}
              </Button>
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full h-12 w-12"
                onClick={endCall}
              >
                <Phone className="rotate-135" />
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="h-[500px] flex flex-col">
            <Tabs defaultValue="chat" className="w-full h-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="participants">Participants</TabsTrigger>
              </TabsList>
              <TabsContent
                value="chat"
                className="flex-1 flex flex-col h-[calc(500px-40px)]"
              >
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.isUser ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-3 ${
                          msg.isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {!msg.isUser && (
                          <div className="font-semibold text-sm mb-1">
                            {msg.sender}
                          </div>
                        )}
                        <p>{msg.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <form onSubmit={sendMessage} className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" className="bg-sky-500">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent
                value="participants"
                className="h-[calc(500px-40px)] p-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-2 rounded-md bg-muted">
                    <div className="w-10 h-10 rounded-full bg-500 flex items-center justify-center">
                      <VideoIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{trainerName}</p>
                      <p className="text-sm text-muted-foreground">
                        Trainer (Host)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-md bg-muted">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <VideoIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">You</p>
                      <p className="text-sm text-muted-foreground">Client</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
