import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { Layout } from '../shared/components/layout';
import { OverlaySpinner } from '../shared/components/overlaySpinner';
import { useApi } from '../shared/api/apiClient';
import { usersRepository } from '../main';

export const OnboardingPage = () => {
  const [username, setUsername] = useState('');
  const [allowMarketing, setAllowMarketing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const api = useApi();
  

  // Log auth details if available
  if (user) {
    console.log('Auth user details:', {
      email: user.email,
      name: user.displayName,
      uid: user.uid,
      isAuthenticated: true
    });
  }

  console.log('here')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get fresh ID token
      const idToken = await user?.getIdToken();
      
      
      let response = await api.members.create({
        username,
        email: user?.email || '',
        userId: user?.uid || ''
      }, idToken);

      if (response.success) {
        navigate('/');
      }
      
    } catch (error) {
      console.error('Failed to create member:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
        <h1 className="text-2xl mb-6">Complete Your Profile</h1>
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
            disabled={isSubmitting}
          >
            Complete Registration
          </button>
        </form>
      </div>
      <OverlaySpinner isActive={isSubmitting} />
    </Layout>
  );
}; 