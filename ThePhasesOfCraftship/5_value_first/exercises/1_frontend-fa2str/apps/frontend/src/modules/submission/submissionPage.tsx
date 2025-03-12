import { observer } from "mobx-react-lite";
import { Layout } from "../layout/layoutComponent";
import { usePresenters } from "../../shared/contexts/presentersContext";
import { SubmissionForm } from "./components/submissionForm";

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