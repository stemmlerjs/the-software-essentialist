import { observer } from "mobx-react-lite";
import { Layout } from "../layout/layoutComponent";
import { usePresenters } from "../../shared/contexts/presentersContext";
import { SubmissionForm } from "./components/submissionForm";
import { Posts } from "@dddforum/api";

export const SubmissionPage = observer(() => {
  const { submission } = usePresenters();

  const handleSubmit = (data: Posts.Commands.CreatePostInput) => {
    submission.submit(data);
  };

  return (
    <Layout>
      <div className="content-container">
        <h2>New submission</h2>
        <SubmissionForm 
          onSubmit={handleSubmit}
          isSubmitting={submission.isSubmitting}
          error={submission.error}
        />
      </div>
    </Layout>
  );
}); 