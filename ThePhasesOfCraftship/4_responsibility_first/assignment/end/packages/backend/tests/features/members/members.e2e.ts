import { createAPIClient } from "@dddforum/shared/src/api";
import { CompositionRoot } from "../../../src/shared/compositionRoot";
import { DatabaseFixture } from "@dddforum/shared/tests/support/fixtures/databaseFixture";
import { Config } from "../../../src/shared/config";
import { EventOutboxTable } from "@dddforum/shared/src/events/outbox/eventOutboxTable";
import { MembersModule } from "@dddforum/backend/src/modules/members/membersModule";

describe('members', () => {

    let databaseFixture: DatabaseFixture;
    let apiClient = createAPIClient("http://localhost:3000");
    let composition: CompositionRoot;
    let config: Config = new Config("test:e2e");
    let outbox: EventOutboxTable;

    const getTestToken = async () => {
      return 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9zdGVtbWxlcmpzLmF1dGgwLmNvbS8ifQ..XH3yp6pxL8HPABug.LLWfCwdxIdS1fyEcccptrV2Mv7VP_vx_hWC3oTXALsD2RZGeKLD1IWeeI-bdPStzD4ZqWiw58wKpsazcQmq5TYT70YczoRsxxubcAmywmpn5zahgzIP7RVpj-ndonQOJ0eiz41wUQKIjl3jgzNZfJj1_5mBJUFSG3s6AFtJNoWpaY4axF6rM5xpD2tlG_1g3gQjjojZ_P-LHnXhFYOmDz5rPEsBpU9hYR8G6crmfG8Sg7dzSn0MYWRfxUf_VtmdiDGW4bflyduQ6hMz259mnBpFdHUcrTgdwlAec9_20lQHE2iSTbxlPgg.CYoPmM2wwVfTvglpVq5Kpg'
    };

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
        userId: 'auth0|123'
      };

      const authToken = await getTestToken();

      const createMemberResponse = await apiClient.members.create(command, authToken);
      // const addToListResponse = await apiClient.marketing.addEmailToList(command.email);

      console.log(createMemberResponse)

      expect(createMemberResponse.success).toBeTruthy();
      expect(createMemberResponse.data).toBeDefined();
      expect(createMemberResponse.data?.username).toBe(command.username);
      expect(createMemberResponse.data?.userId).toBe(command.userId);

      // expect(addToListResponse.success).toBeTruthy();
      // expect(addToListResponse.data).toBeTruthy();

      // Verify member was actually created in DB
      const member = await (composition.getModule('members') as MembersModule).getMemberRepository().findUserByUsername(command.username);
      expect(member).toBeDefined();
      expect(member?.username).toBe(command.username);
      expect(member?.userId).toBe(command.userId);
    })

    test('Successful member registration without marketing emails accepted', () => {

    })

    test('Successful member registration even though they already exists, does nothing but just returns the already existing member (noop)', () => {

    })

    test('Failed member registration due to invalid command', () => {
      
    })

    test('Failed member registration due to user not existing', () => {
      
    })

})

