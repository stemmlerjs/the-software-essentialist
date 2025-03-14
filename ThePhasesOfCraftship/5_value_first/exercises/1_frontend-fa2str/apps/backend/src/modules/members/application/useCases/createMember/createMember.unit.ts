import { Member } from "../../../domain/member";
import { CreateMember } from "./createMember";
import { ProductionMembersRepository } from "../../../repos/adapters/productionMembersRepository";
import { EventOutboxTable } from "@dddforum/outbox";
import { PrismaDatabase } from "@dddforum/database";
import { Commands } from '@dddforum/api/members'
import { Config } from "@dddforum/config";
import { Types } from '@dddforum/api/users';

describe('createMember', () => {
  let config = Config();
  let database = new PrismaDatabase(config);
  let outboxTable = new EventOutboxTable(database);
  let membersRepo = new ProductionMembersRepository(database, outboxTable);
  const useCase = new CreateMember(membersRepo);

  const mockToken: Types.DecodedIdToken = {
    email: 'test@example.com',
    uid: 'auth0|123'
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should create a member when username is available and data is valid', async () => {
    useCase['memberRepository'].getMemberByUserId = jest.fn().mockResolvedValue(null);
    useCase['memberRepository'].findUserByUsername = jest.fn().mockResolvedValue(null);
    const saveSpy = jest.spyOn(useCase['memberRepository'], 'saveAggregateAndEvents')
      .mockImplementation(async () => {});

    const commandOrError = Commands.CreateMemberCommand.create(mockToken, {
      username: 'validuser'
    });
    expect(commandOrError.isSuccess()).toBe(true);
    if (!commandOrError.isSuccess()) return;

    const result = await useCase.execute(commandOrError.getValue());

    expect(result.isSuccess()).toBe(true);
    expect(result.getValue()).toBeInstanceOf(Member);
    expect(saveSpy).toHaveBeenCalled();
  });

  test('should fail if username is already taken', async () => {
    const existingMember = Member.create({
      username: 'takenuser',
      userId: 'existing-user-id'
    }) as Member;

    useCase['memberRepository'].getMemberByUserId = jest.fn().mockResolvedValue(null);
    useCase['memberRepository'].findUserByUsername = jest.fn().mockResolvedValue(existingMember);
    const saveSpy = jest.spyOn(useCase['memberRepository'], 'saveAggregateAndEvents')
      .mockImplementation(async () => {});

    const commandOrError = Commands.CreateMemberCommand.create(mockToken, {
      username: 'takenuser'
    });
    expect(commandOrError.isSuccess()).toBe(true);
    if (!commandOrError.isSuccess()) return;

    const result = await useCase.execute(commandOrError.getValue());

    expect(result.isSuccess()).toBe(false);
    expect(result.getError().name).toBe('MemberUsernameTaken');
    expect(saveSpy).not.toHaveBeenCalled();
  });

  test('should fail if validation fails', async () => {
    const commandOrError = Commands.CreateMemberCommand.create(mockToken, {
      username: '' // Invalid username
    });

    expect(commandOrError.isSuccess()).toBe(false);
  });
});
