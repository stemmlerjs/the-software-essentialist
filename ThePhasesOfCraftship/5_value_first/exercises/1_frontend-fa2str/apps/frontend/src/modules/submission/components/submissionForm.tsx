import { useState } from "react";

interface SubmissionFormProps {
  onSubmit: (data: { title: string; text: string }) => void;
  isSubmitting: boolean;
  error: string | null;
}

export const SubmissionForm = ({ onSubmit, isSubmitting, error }: SubmissionFormProps) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, text });
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
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit post"}
      </button>
    </form>
  );
}; 