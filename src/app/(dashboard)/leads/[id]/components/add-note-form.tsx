"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addLeadNote } from "@/actions/leads";
import { Send } from "lucide-react";

export function AddNoteForm({ leadId }: { leadId: string }) {
  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsPending(true);
    try {
      await addLeadNote(leadId, content);
      setContent("");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Textarea
        placeholder="Add a comment or follow-up note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px] pr-12 resize-none border-primary/20 bg-background/50 focus:bg-background transition-colors rounded-xl p-4 text-sm"
      />
      <div className="absolute bottom-3 right-3">
        <Button 
          type="submit" 
          size="icon" 
          className="rounded-full h-8 w-8"
          disabled={isPending || !content.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
