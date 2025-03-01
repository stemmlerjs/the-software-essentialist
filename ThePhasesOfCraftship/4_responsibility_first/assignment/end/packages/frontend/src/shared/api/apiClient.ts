import { createAPIClient } from '@dddforum/shared/src/api';
import { useAuth0 } from '@auth0/auth0-react';
import { appConfig } from '../../config';
import { CreatePostInput } from '@dddforum/shared/src/api/posts';
import { CreateMemberInput } from '@dddforum/shared/src/api/members';

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
      create: async (input: CreateMemberInput, token: string) => {
        return api.members.create(input, token);
      }
    }
  };
}; 