import { observer } from "mobx-react-lite";
import { Layout } from "../layout/layoutComponent";
import { usePresenters } from "../../shared/contexts/presentersContext";
import { SubmissionForm } from "./components/submissionForm";

export const SubmissionPage = observer(() => {
  const { submission } = usePresenters();

  return (
    <Layout>
      <div className="content-container">
        <h2>New submission</h2>
        <SubmissionForm 
          onSubmit={submission.submit}
          isSubmitting={submission.isSubmitting}
          error={submission.error}
        />
      </div>
    </Layout>
  );
}); 