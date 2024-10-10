"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GetAllUsers } from "@/lib/actions/messages";
import { Tables } from "@/database.types";

export default function Conversations() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [users, setUsers] = useState<UsersT[]>([]);

  const handleOpenChat = (user_id: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("user_id", user_id);
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await GetAllUsers();
      if (data) setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <Card className="w-64 h-full rounded-none border-r border-l-0 border-t-0 border-b-0">
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {users.map((item, index) => (
            <button
              key={index}
              onClick={() => handleOpenChat(item.id)}
              className={`border-b flex items-center gap-3 w-full p-3 hover:bg-muted transition-colors`}
            >
              <div className="text-left">
                <div className="font-semibold">{item.email}</div>
                {/* <div className="text-sm text-muted-foreground truncate">
                  recent message here.
                </div> */}
              </div>
            </button>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export type UsersT = Tables<"users">;
