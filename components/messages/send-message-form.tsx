"use client";

import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SendHorizonal } from "lucide-react";
import { SendMessage } from "@/lib/actions/messages";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "@/context/user-context";

export default function SendMessageForm({ user_id }: { user_id: string }) {
  const { loading: userLoading, user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (!formData.get("message")) {
      return;
    }
    setLoading(false);
    try {
      const response = await SendMessage(formData);

      if (!response) {
        toast.error("Error sending message.");
      }
    } catch (error) {
      toast.error("There was an unexpected error sending message.");
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  if (userLoading) return;

  return (
    <Card className="rounded-none border-t border-0">
      <CardContent className="p-3">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input name="sender_id" defaultValue={user?.id} hidden />
          <input name="receiver_id" defaultValue={user_id} hidden />
          <input
            name="conversation_id"
            defaultValue={`${user_id}${user?.id}`}
            hidden
          />
          <Input
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button disabled={loading} type="submit" size="icon">
            <SendHorizonal className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
