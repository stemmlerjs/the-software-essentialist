import { PrismaClient } from "@prisma/client";
import { Member } from "../../../domain/member";
import { CreateMember } from "./createMember";
import { ProductionMembersRepository } from "../../../repos/adapters/productionMembersRepository";
import { UserIdentityService } from "../../../../users/application/userIdentityService";
import { CreateMemberCommand } from "../../../memberCommands";
import { ApplicationErrors } from "@dddforum/errors/src";
import { EventOutboxTable } from "@dddforum/outbox/src";
import { } from '../../../../users/application/userIdentityService'
import { FirebaseAuth } from "../../../../users/externalServices/adapters/firebaseAuth";

describe('createMember', () => {
  let prisma = new PrismaClient();
  let firebaseAuth = new FirebaseAuth();
  let usersService = new UserIdentityService(firebaseAuth);
  let outboxTable = new EventOutboxTable(prisma);
  let membersRepo = new ProductionMembersRepository(prisma, outboxTable);
  const useCase = new CreateMember(membersRepo);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should create a member when username is available and data is valid', async () => {
    // Mock repository to say username is not taken
    useCase['memberRepository'].getMemberByUserId = jest.fn().mockResolvedValue(null);
    const saveSpy = jest.spyOn(useCase['memberRepository'], 'save').mockImplementation(async () => {});

    const command = new CreateMemberCommand({
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

    const command = new CreateMemberCommand({
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

    const command = new CreateMemberCommand({
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
