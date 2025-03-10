import { Member, MemberReputationLevel } from "./member"

describe('member', () => {
  test('a new member should start out at level 1 reputation level', () => {
    let member = Member.create({
      userId: '8be25ac7-49ff-43be-9f22-3811e268e0bd',
      username: 'billy',
    }) as Member;

    expect(member.reputationLevel).toEqual(MemberReputationLevel.Level1)
  })
})
