"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip, Smile } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { io, Socket } from "socket.io-client"

type Message = {
  content: string;
  sender: string;
  recipient: string | null;
  time: string;
  isOwn?: boolean;
};

type SupabaseMessage = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
};

type User = {
  id: string;
  username: string;
};

type ConversationUser = {
  id: string;
  username: string;
};

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("recipient");
  const [newMessage, setNewMessage] = useState("");
  const [socketMessages, setSocketMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [fetchedMessages, setFetchedMessages] = useState<Message[]>([]);
  const [recipientUser, setRecipientUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<ConversationUser[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/user")
      .then(res => res.json())
      .then(data => {
        if (data && data.id) setCurrentUserId(data.id);
      });
  }, []);

  useEffect(() => {
    const socket = io()
    socketRef.current = socket
    socket.on("message", (data: Message) => {
      setSocketMessages((prev) => [...prev, data])
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!currentUserId || !recipientId) return;
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages?user1=${currentUserId}&user2=${recipientId}`);
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setFetchedMessages(
            data.map((msg: SupabaseMessage) => ({
              content: msg.content,
              sender: msg.sender_id,
              recipient: msg.receiver_id,
              time: new Date(msg.created_at).toLocaleTimeString(),
              isOwn: msg.sender_id === currentUserId,
            }))
          );
        } else {
          console.error('Error fetching messages:', data);
        }
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };
    fetchMessages();
  }, [currentUserId, recipientId]);

  useEffect(() => {
    if (!recipientId || recipientId === currentUserId) {
      setRecipientUser(null);
      return;
    }
    const fetchRecipient = async () => {
      const res = await fetch(`/api/user?userId=${recipientId}`);
      const data = await res.json();
      if (res.ok && data && data.id) setRecipientUser(data);
    };
    fetchRecipient();
  }, [recipientId, currentUserId]);

  useEffect(() => {
    if (!currentUserId) return;
    const fetchConversations = async () => {
      const res = await fetch(`/api/conversations?userId=${currentUserId}`);
      const data = await res.json();
      if (res.ok && Array.isArray(data)) setConversations(data);
    };
    fetchConversations();
  }, [currentUserId]);

  const sendMessage = async () => {
    if (newMessage.trim() && socketRef.current && currentUserId && recipientId) {
      try {
        const res = await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sender_id: currentUserId,
            receiver_id: recipientId,
            content: newMessage,
          }),
        });
        let data = null;
        try {
          data = await res.json();
        } catch (jsonErr) {
          console.error('Error parsing JSON:', jsonErr);
        }
        if (!res.ok || !data) {
          console.error('Error saving message:', data);
          return;
        }
        // Real-time emit
        const msgData: Message = {
          content: newMessage,
          sender: currentUserId,
          recipient: recipientId,
          time: new Date().toLocaleTimeString(),
          isOwn: true,
        };
        socketRef.current.emit("message", msgData);
        setSocketMessages((prev) => [...prev, msgData]);
        setNewMessage("");
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-lg p-4 md:col-span-1 h-[60vh] flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Conversations</h2>
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 && <div className="text-gray-400 text-sm">No conversations yet.</div>}
            {conversations.map((user) => (
              <div
                key={user.id}
                className={`p-2 rounded-lg cursor-pointer mb-1 transition-colors flex items-center ${
                  recipientId === user.id ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-100"
                }`}
                onClick={() => router.push(`/messages?recipient=${user.id}`)}
              >
                <span className="truncate">{user.username}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Chat Area */}
        <div className="md:col-span-3">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl flex flex-col">
            <CardHeader className="pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Messages
                </h1>
                {recipientUser && (
                  <span className="ml-4 text-sm text-gray-500">
                    Chatting with: <b>{recipientUser.username}</b>
                  </span>
                )}
                {recipientId === currentUserId && (
                  <span className="ml-4 text-sm text-gray-500">
                    You cannot chat with yourself.
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[60vh] p-4">
                <div className="space-y-4">
                  {[...fetchedMessages, ...socketMessages
                    .filter(
                      (msg) =>
                        (msg.sender === currentUserId && msg.recipient === recipientId) ||
                        (msg.sender === recipientId && msg.recipient === currentUserId)
                    )]
                    .map((message, idx) => (
                      <div key={idx} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[70%] p-3 rounded-2xl ${
                            message.isOwn
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className={`flex items-center justify-end mt-1 space-x-1`}>
                            <span className={`text-xs ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                              {message.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip size={16} />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="pr-10"
                  />
                  <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    <Smile size={16} />
                  </Button>
                </div>
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
