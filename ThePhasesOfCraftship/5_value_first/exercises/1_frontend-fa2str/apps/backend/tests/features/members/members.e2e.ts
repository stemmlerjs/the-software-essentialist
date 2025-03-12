import { createAPIClient } from "@dddforum/api";
import { CompositionRoot } from "../../../src/shared/compositionRoot";
import { DatabaseFixture } from "@dddforum/shared/tests/support/fixtures/databaseFixture";
import { Config } from "../../../src/shared/config";
import { EventOutboxTable } from "@dddforum/shared/src/events/outbox/eventOutboxTable";
import { MembersModule } from "@dddforum/backend/modules/members/membersModule";
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { auth } from 'firebase-admin';

describe('members', () => {

    let databaseFixture: DatabaseFixture;
    let apiClient = createAPIClient("http://localhost:3000");
    let composition: CompositionRoot;
    let config: Config = new Config("test:e2e");
    let outbox: EventOutboxTable;

    // Create a test token using Firebase Admin SDK
    async function createTestToken(uid: string): Promise<string> {
      return await auth().createCustomToken(uid);
    }

    beforeAll(async () => {
      composition = CompositionRoot.createCompositionRoot(config);
      await composition.start();
      databaseFixture = new DatabaseFixture(composition);
      outbox = composition.getEventOutboxTable();
    });

    afterAll(async () => {
      await composition.stop()
    });

    test('Successful member registration with marketing emails accepted', async () => {
      const command = {
        username: 'testuser',
        email: 'test@example.com',
        userId: 'firebase_user_123'
      };

      // Get a Firebase ID token for testing
      const customToken = await createTestToken(command.userId);
      const userCredential = await signInWithCustomToken(getAuth(), customToken);
      const idToken = await userCredential.user.getIdToken();

      const createMemberResponse = await apiClient.members.create(command, idToken);
      const addToListResponse = await apiClient.marketing.addEmailToList(command.email);

      expect(createMemberResponse.success).toBeTruthy();
      expect(createMemberResponse.data).toBeDefined();
      expect(createMemberResponse.data?.username).toBe(command.username);
      expect(createMemberResponse.data?.userId).toBe(command.userId);

      expect(addToListResponse.success).toBeTruthy();
      expect(addToListResponse.data).toBeTruthy();

      const member = await (composition.getModule('members') as MembersModule)
        .getMemberRepository()
        .findUserByUsername(command.username);
      expect(member).toBeDefined();
      expect(member?.username).toBe(command.username);
      expect(member?.userId).toBe(command.userId);
    });

    test('Successful member registration without marketing emails accepted', () => {

    })

    test('Successful member registration even though they already exists, does nothing but just returns the already existing member (noop)', () => {

    })

    test('Failed member registration due to invalid command', () => {
      
    })

    test('Failed member registration due to user not existing', () => {
      
    })

})

