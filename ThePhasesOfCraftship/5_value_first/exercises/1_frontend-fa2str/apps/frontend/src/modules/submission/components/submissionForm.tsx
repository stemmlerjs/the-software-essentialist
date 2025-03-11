import * as Posts from "@dddforum/api/posts";
import { useState } from "react";

interface SubmissionFormProps {
  onSubmit: (data: Posts.Commands.CreatePostInput) => void;
  isSubmitting: boolean;
  error: string | null;
}

export const SubmissionForm = ({ onSubmit, isSubmitting, error }: SubmissionFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Make this work for link posts as well
    // TODO: Determine if this should be here
    onSubmit({ title, content,  postType: 'text' });
  };

  return (
    <form onSubmit={handleSubmit} className="submission-form">
      <input
        type="text"
        placeholder="Enter the title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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