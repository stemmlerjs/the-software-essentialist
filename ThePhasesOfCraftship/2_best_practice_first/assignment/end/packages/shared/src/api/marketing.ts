
import axios from 'axios';

export const createMarketingAPI = (apiURL: string) => {
  return {
    addEmailToList: (email: string) => {
      return axios.post(`${apiURL}/marketing/new`, {
        email
      })
    }
  }
}