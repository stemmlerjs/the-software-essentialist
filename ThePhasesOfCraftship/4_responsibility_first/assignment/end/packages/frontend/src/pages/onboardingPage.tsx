import { useState } from 'react';
import { Layout } from '../modules/layout/layout';
import { OverlaySpinner } from '../shared/components/overlaySpinner';
import { observer } from 'mobx-react-lite';
import { OnboardingPresenter } from '../modules/users/application/onboardingPresenter';

export const OnboardingPage = observer(({ presenter }: { presenter: OnboardingPresenter }) => {
  const [username, setUsername] = useState('');
  const [allowMarketing, setAllowMarketing] = useState(false);

  setTimeout(() => {
    presenter.testUpdateMember();
  }, 2000)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await presenter.registerMember({
      username,
      allowMarketing
    });
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
        <h2 className="text-1xl mb-6">Complete Your Profile</h2>
        {presenter.error && (
          <div className="error mb-4 text-red-500">
            {presenter.error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={allowMarketing}
                onChange={(e) => setAllowMarketing(e.target.checked)}
                className="mr-2"
              />
              <span>I want to receive updates and marketing emails</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={presenter.isSubmitting}
          >
            {presenter.isSubmitting ? 'Registering...' : 'Complete Registration'}
          </button>
        </form>
      </div>
      <OverlaySpinner isActive={presenter.isSubmitting} />
    </Layout>
  );
}); 