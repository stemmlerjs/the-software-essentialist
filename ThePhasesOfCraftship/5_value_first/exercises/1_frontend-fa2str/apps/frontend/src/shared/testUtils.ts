import { MemberDm } from "@/modules/auth/domain/memberDm";
import { AuthStore } from "@/modules/auth/authStore";
import { UserDm } from "@/modules/auth/domain/userDm";

export function setupAuthStoreWithAuthenticatedUser(authStore: AuthStore, overrides?: {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  userId?: string;
}) {
  const idToken = 'test-id-token';
  const user = new UserDm({
    id: overrides?.userId || 'test-user-id',
    email: overrides?.email || 'test@example.com',
    firstName: overrides?.firstName || 'Test',
    lastName: overrides?.lastName || 'User'
  });

  if (overrides?.username) {
    const member = new MemberDm({
      id: 'test-member-id',
      username: overrides.username,
      email: user.email,
      userId: user.id,
      reputationLevel: 'Level1'
    });
    authStore['currentMember'] = member;
  }

  authStore['idToken'] = idToken;
  authStore['currentUser'] = user;

  return { authStore, idToken, user };
}

export function setupAuthStoreWithOnboardedMember(authStore: AuthStore, user: UserDm, overrides?: {
  memberId?: string;
  username?: string;
  reputationLevel?: 'Level1' | 'Level2' | 'Level3';
}) {
  const member = new MemberDm({
    id: overrides?.memberId || 'test-member-id',
    username: overrides?.username || 'testuser',
    email: user.email,
    userId: user.id,
    reputationLevel: overrides?.reputationLevel || 'Level1'
  });

  authStore['currentMember'] = member;
  return { authStore, member };
} 