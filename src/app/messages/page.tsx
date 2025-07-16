import { Suspense } from "react";
import MessagesPage from "@/components/messages-page";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MessagesPage />
    </Suspense>
  );
}