"use client";

import { Card, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { GetUserMessageById } from "@/lib/actions/messages";
import { createClient } from "@/lib/supabase/client";
import { FormatDateTimeAgo } from "@/lib/utils";
import { GetUserById } from "@/lib/actions/users";
import { useState, useEffect } from "react";
import { useUser } from "@/context/user-context";
import type { MessagesT } from "@/app/messages/page";

export default function UserMessages({ user_id }: { user_id: string }) {
  const supabase = createClient();
  const { loading, user: myData } = useUser();
  const [userEmail, setUserEmail] = useState<string>();
  const [messages, setMessage] = useState<MessagesT[]>([]);

  const conversation_id = `${user_id}${myData?.id}`;

  const fetchMessages = async () => {
    const data = await GetUserMessageById(conversation_id);
    if (data) setMessage(data.reverse());
  };

  const fetchUserData = async () => {
    const data = await GetUserById(user_id);
    if (data) setUserEmail(data.email);
  };

  useEffect(() => {
    fetchMessages();
    fetchUserData();

    const subscription = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${user_id}${myData?.id}`,
        },
        fetchMessages
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user_id, myData]);

  if (loading) return;

  return (
    <>
      {/* Chat header */}
      <Card className="rounded-none border-b border-t-0 border-l-0 border-r-0">
        <CardHeader className="py-3">
          <CardTitle className="text-lg">{!loading && userEmail}</CardTitle>
        </CardHeader>
      </Card>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        {messages?.map((item, index) => (
          <div
            key={index}
            className={`flex ${
              item.sender_id === user_id ? "justify-start" : "justify-end"
            } mb-4`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                item.receiver_id === user_id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p>{item.message}</p>
              <p className="text-xs mt-1 opacity-70">
                {FormatDateTimeAgo(new Date(item.created_at))}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </>
  );
}
