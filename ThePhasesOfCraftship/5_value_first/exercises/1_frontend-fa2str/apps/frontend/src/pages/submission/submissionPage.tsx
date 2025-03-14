import { observer } from "mobx-react-lite";
import { usePresenters } from "../../shared/presenters/presentersContext";
import { SubmissionForm } from "./components/submissionForm";
import { Layout } from "@/shared/layout/layoutComponent";

export const SubmissionPage = observer(() => {
  const { submission } = usePresenters();

  const handleSubmit = (data: { title: string; content: string; link?: string }) => {
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