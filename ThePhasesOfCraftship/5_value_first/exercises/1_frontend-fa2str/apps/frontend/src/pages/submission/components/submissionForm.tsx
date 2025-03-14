import { Posts } from "@dddforum/api";
import { useState } from "react";

interface SubmissionFormProps {
  onSubmit: (data: { title: string; content: string; link?: string }) => void;
  isSubmitting: boolean;
  error: string | null;
}

export const SubmissionForm = ({ onSubmit, isSubmitting, error }: SubmissionFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ 
      title, 
      content,
      link: link || undefined
    });
  };

  return (
    <form onSubmit={handleSubmit} className="submission-form">
      <input
        type="text"
        placeholder="Enter the title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter link (optional)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <textarea
        placeholder="Write a post!"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit post"}
      </button>
    </form>
  );
}; 