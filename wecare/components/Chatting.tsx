"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Smile, Paperclip, Send, Search, Menu, X } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Image from "next/image";

const doctors = [
  {
    id: 1,
    name: "Dr. Smith",
    specialty: "Cardiologist",
    avatar: "/assets/icons/placeholder.png?height=40&width=40",
    lastMessage: "How are you feeling today?",
  },
  {
    id: 2,
    name: "Dr. Johnson",
    specialty: "Dermatologist",
    avatar: "/assets/icons/placeholder.png?height=40&width=40",
    lastMessage: "Your test results are ready.",
  },
  {
    id: 3,
    name: "Dr. Williams",
    specialty: "Neurologist",
    avatar: "/assets/icons/placeholder.png?height=40&width=40",
    lastMessage: `Don't forget your appointment tomorrow.`,
  },
  {
    id: 4,
    name: "Dr. Brown",
    specialty: "Pediatrician",
    avatar: "/assets/icons/placeholder.png?height=40&width=40",
    lastMessage: "How is the new medication working?",
  },
  {
    id: 5,
    name: "Dr. Davis",
    specialty: "Oncologist",
    avatar: "/assets/icons/placeholder.png?height=40&width=40",
    lastMessage: `Let's schedule a follow-up.`,
  },
];

const gifs = [
  "https://media.giphy.com/media/3o7TKsQ8UJIRZWUdR6/giphy.gif",
  "https://media.giphy.com/media/3o7aCSPqXE5C6T8tBC/giphy.gif",
  "https://media.giphy.com/media/3o7aCTNjq3qiUbzrHi/giphy.gif",
];

interface Message {
  id: number;
  sender: string;
  content: string;
  type: "text" | "image" | "document" | "gif";
}

export default function DoctorChat() {
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "You",
        content: inputMessage,
        type: "text",
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "You",
        content: file.name,
        type: "document",
      };
      setMessages([...messages, newMessage]);
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setInputMessage(inputMessage + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleGifSelect = (gif: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      sender: "You",
      content: gif,
      type: "gif",
    };
    setMessages([...messages, newMessage]);
    setShowGifPicker(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen w-full flex bg-gray-900 text-gray-100 relative overflow-hidden max-h-[calc(100vh-300px)] md:max-h-[calc(100vh-200px)]">
      {/* Sliding Sidebar */}
      <motion.div
        initial={{ x: -350 }}
        animate={{ x: isSidebarOpen ? 0 : -350 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 top-0 bottom-0 w-80 bg-gray-800 z-50 flex flex-col"
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">Doctors</h2>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search doctors"
              className="pl-10 bg-gray-700 border-gray-600 text-gray-100"
            />
          </div>
        </div>
        <ScrollArea className="flex-grow">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-700 ${
                selectedDoctor.id === doctor.id ? "bg-gray-700" : ""
              }`}
              onClick={() => {
                setSelectedDoctor(doctor);
                setIsSidebarOpen(false);
              }}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={doctor.avatar} alt={doctor.name} />
                <AvatarFallback>{doctor.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <h3 className="text-sm font-semibold">{doctor.name}</h3>
                <p className="text-xs text-gray-400">{doctor.specialty}</p>
                <p className="text-xs text-gray-500 truncate">
                  {doctor.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </motion.div>

      <div className="flex-grow flex flex-col ">
        <div className="p-4  flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={selectedDoctor.avatar}
              alt={selectedDoctor.name}
            />
            <AvatarFallback>{selectedDoctor.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className="text-lg font-semibold">{selectedDoctor.name}</h2>
            <p className="text-sm text-gray-400">{selectedDoctor.specialty}</p>
          </div>
        </div>

        <ScrollArea className="flex-grow p-4" ref={chatContainerRef}>
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.sender === "You" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === "You"
                      ? "bg-[#6c63ff] text-white"
                      : "bg-[#3a3d5c] text-gray-100"
                  }`}
                >
                  {message.type === "text" && (
                    <p className="break-words">{message.content}</p>
                  )}
                  {message.type === "document" && (
                    <div className="flex items-center space-x-2">
                      <Paperclip className="w-4 h-4" />
                      <span className="truncate">{message.content}</span>
                    </div>
                  )}
                  {message.type === "gif" && (
                    <Image
                      src={message.content}
                      alt="GIF"
                      className="max-w-full rounded"
                      width={1200}
                      height={1200}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>

        <div className="p-4 ">
          <div className="flex items-center space-x-2">
            <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-gray-100"
                >
                  <Smile className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 bg-gray-700 border-gray-600">
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  theme="dark"
                />
              </PopoverContent>
            </Popover>
            <Popover open={showGifPicker} onOpenChange={setShowGifPicker}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-100"
                >
                  GIF
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 bg-gray-700 border-gray-600">
                <div className="grid grid-cols-2 gap-2 p-2">
                  {gifs.map((gif, index) => (
                    <Image
                      key={index}
                      src={gif}
                      alt={`GIF ${index + 1}`}
                      className="w-full h-auto cursor-pointer rounded hover:opacity-80 transition-opacity duration-300"
                      onClick={() => handleGifSelect(gif)}
                      width={1200}
                      height={1200}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-gray-100"
                asChild
              >
                <span>
                  <Paperclip className="h-5 w-5" />
                </span>
              </Button>
            </label>
            <Input
              type="text"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow bg-gray-700 border-gray-600 text-gray-100"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-blue-700 hover:bg-blue-800 text-white"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
