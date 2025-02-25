import { createAPIClient } from '@dddforum/shared/src/api';
import { useAuth0 } from '@auth0/auth0-react';
import { appConfig } from '../../config';
import { CreatePostInput } from '@dddforum/shared/src/api/posts';

export const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();
  const api = createAPIClient(appConfig.apiURL);

  return {
    posts: {
      ...api.posts,
      create: async (command: CreatePostInput) => {
        const token = await getAccessTokenSilently();
        return api.posts.create(command, token);
      }
    },
    members: {
      create: async (data: { username: string; email: string; allowMarketingEmails: boolean }) => {
        const token = await getAccessTokenSilently();
        return api.members.create(data, token);
      }
    }
  };
}; 