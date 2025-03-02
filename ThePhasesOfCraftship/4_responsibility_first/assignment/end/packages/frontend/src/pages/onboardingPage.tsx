import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { Layout } from '../shared/components/layout';
import { OverlaySpinner } from '../shared/components/overlaySpinner';
import { onboardingPresenter } from '../main';
import { observer } from 'mobx-react-lite';

export const OnboardingPage = observer(() => {
  const [username, setUsername] = useState('');
  const [allowMarketing, setAllowMarketing] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      console.error('No authenticated user found');
      return;
    }

    await onboardingPresenter.registerMember({
      username,
      email: user.email || '',
      userId: user.uid,
      allowMarketing
    });
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
        <h2 className="text-1xl mb-6">Complete Your Profile</h2>
        {onboardingPresenter.error && (
          <div className="error mb-4 text-red-500">
            {onboardingPresenter.error}
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
            disabled={onboardingPresenter.isSubmitting}
          >
            {onboardingPresenter.isSubmitting ? 'Registering...' : 'Complete Registration'}
          </button>
        </form>
      </div>
      <OverlaySpinner isActive={onboardingPresenter.isSubmitting} />
    </Layout>
  );
}); 