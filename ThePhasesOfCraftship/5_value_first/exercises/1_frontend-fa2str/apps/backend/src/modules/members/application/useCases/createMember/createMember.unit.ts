import { PrismaClient } from "@prisma/client";
import { Member } from "../../../domain/member";
import { CreateMember } from "./createMember";
import { ProductionMembersRepository } from "../../../repos/adapters/productionMembersRepository";
import { UserIdentityService } from "../../../../users/application/userIdentityService";
import { ApplicationErrors } from "@dddforum/errors/application";
import { EventOutboxTable } from "@dddforum/outbox";
import { } from '../../../../users/application/userIdentityService'
import { FirebaseAuth } from "../../../../users/externalServices/adapters/firebaseAuth";
import { PrismaDatabase } from "@dddforum/database";
import { Commands } from '@dddforum/api/members'
import { Config } from "@dddforum/config";

describe('createMember', () => {
  let prisma = new PrismaClient();
  let firebaseAuth = new FirebaseAuth();
  let config = Config();
  let database = new PrismaDatabase(config);
  let usersService = new UserIdentityService(firebaseAuth);
  let outboxTable = new EventOutboxTable(database);
  let membersRepo = new ProductionMembersRepository(prisma, outboxTable);
  const useCase = new CreateMember(membersRepo);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should create a member when username is available and data is valid', async () => {
    // Mock repository to say username is not taken
    useCase['memberRepository'].getMemberByUserId = jest.fn().mockResolvedValue(null);
    const saveSpy = jest.spyOn(useCase['memberRepository'], 'save').mockImplementation(async () => {});

    const command = new Commands.CreateMemberCommand({
      username: 'validuser',
      email: 'test@example.com',
      userId: 'auth0|123'
    });

    const response = await useCase.execute(command);

    expect(response.isSuccess()).toBe(true);
    expect(response.getValue() instanceof Member).toBe(true);
    expect(saveSpy).toHaveBeenCalled();
  });

  test('should fail if username is already taken', async () => {
    // Mock repository to say username is taken
    const existingMember = Member.create({
      username: 'takenuser',
      userId: 'existing-user-id'
    }) as Member;

    useCase['memberRepository'].findUserByUsername = jest.fn().mockResolvedValue(existingMember);
    const saveSpy = jest.spyOn(useCase['memberRepository'], 'save').mockImplementation(async () => {});

    const command = new Commands.CreateMemberCommand({
      username: 'takenuser',
      email: 'test@example.com',
      userId: 'auth0|123'
    });

    const response = await useCase.execute(command);

    expect(response.isSuccess()).toBe(false);
    expect(response.getError().name).toBe('MemberUsernameTaken');
    expect(saveSpy).not.toHaveBeenCalled();
  });

  test('should fail if validation fails', async () => {
    useCase['memberRepository'].findUserByUsername = jest.fn().mockResolvedValue(null);
    const saveSpy = jest.spyOn(useCase['memberRepository'], 'save').mockImplementation(async () => {});

    const command = new Commands.CreateMemberCommand({
      username: '', // Invalid username
      email: 'test@example.com',
      userId: 'auth0|123'
    });

    const response = await useCase.execute(command);

    expect(response.isSuccess()).toBe(false);
    expect(response.getError() instanceof ApplicationErrors.ValidationError).toBe(true);
    expect(saveSpy).not.toHaveBeenCalled();
  });
});
