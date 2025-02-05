
import { createAPIClient } from "@dddforum/shared/src/api";

const apiClient = createAPIClient("http://localhost:3000");

describe('posts', () => {

  describe ('creating new posts', () => {

    let authToken: string = "asdasds"

    it ('can create a text post', async () => {
      // later, make sure that we're authenticated (and we can put that into the client?, as the initial test harness)
      let response = await apiClient.posts.create({
        title: 'My first post',
        postType: 'text',
        content: 'This is my first post! I hope you like it!'
      }, authToken);
    });

    it ('can create a link post', async () => {
      let response = await apiClient.posts.create({
        title: 'Check out this site!',
        postType: 'link',
        link: 'https://khalilstemmler.com'
      }, authToken);
    })
    
  });

  
})
