import { useApi } from '../shared/api/apiClient';

export const CreatePostPage = () => {
  const api = useApi();

  const handleCreatePost = async (postData: CreatePostInput) => {
    const response = await api.posts.create(postData);
    // Handle response
  };

  // ... rest of component
}; 