import { NotFoundError } from "@dddforum/shared/src/errors";
import { User } from "../../domain/user";
import { IdentityServiceAPI } from "../ports/identityServiceAPI";
import axios from 'axios';

export class Auth0 implements IdentityServiceAPI {
  private token: string | null = null;
  private baseUrl: string;

  constructor(
    private domain: string,
    private clientId: string,
    private clientSecret: string
  ) {
    this.baseUrl = `https://${domain}/api/v2`;
  }

  private async getManagementToken(): Promise<string | null> {
    if (this.token) return this.token;

    const response = await axios.post(`https://${this.domain}/oauth/token`, {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      audience: `https://${this.domain}/api/v2/`,
      grant_type: 'client_credentials'
    });

    this.token = response.data.access_token;
    return this.token;
  }

  async getUserById(userId: string): Promise<User | NotFoundError> {
    try {
      const token = await this.getManagementToken();
      const response = await axios.get(`${this.baseUrl}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return {
        id: response.data.user_id,
        email: response.data.email,
        emailVerified: response.data.email_verified,
        name: response.data.name
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return new NotFoundError();
      }
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<User | NotFoundError> {
    try {
      const token = await this.getManagementToken();
      const response = await axios.get(`${this.baseUrl}/users-by-email`, {
        params: { email },
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.data?.[0]) {
        return new NotFoundError();
      }

      const user = response.data[0];
      return {
        id: user.user_id,
        email: user.email,
        emailVerified: user.email_verified,
        name: user.name
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return new NotFoundError();
      }
      throw error;
    }
  }
}