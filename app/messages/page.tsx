import { Tables } from "@/database.types";
import Conversations from "@/components/messages/conversations";
import UserMessages from "@/components/messages/user-messages";
import SendMessageForm from "@/components/messages/send-message-form";

export default function Messages({
  searchParams,
}: {
  searchParams?: { user_id?: string };
}) {
  const user_id = searchParams?.user_id || "";

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar with recent chats */}
      <Conversations />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {user_id && <UserMessages user_id={user_id} />}

        {/* Message input */}
        {user_id && <SendMessageForm user_id={user_id}/>}
      </div>
    </div>
  );
}

export type MessagesT = Tables<"messages">;
