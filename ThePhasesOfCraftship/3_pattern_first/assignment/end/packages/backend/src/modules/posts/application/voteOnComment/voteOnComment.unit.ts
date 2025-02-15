
describe('voteOnComment', () => {

  describe('permissions', () => {
    it.each([
      ['level 1'],
      ['level 2']
    ])('as a %s member, I can cast a vote on a comment', (level) => {
  
    });
  });

  describe ('vote state', () => {
    test('as a level 1 member, when I upvote a comment I have not yet upvoted, the comment should be upvoted', () => {});
    test('as a level 1 member, when I downvote a comment I have not yet downvoted, the comment should be downvoted', () => {});
    test('as a level 1 member, when I upvote a comment I have already upvoted, the comment should be unvoted', () => {});
    test('as a level 1 member, when I downvote a comment I have already downvoted, the comment should be unvoted', () => {});
  })

  describe ('many existing comments vote score', () => {

    test('upvote existing: as a level 1 member, when I upvote a comment with existing votes that I have not yet upvoted, the comment score should get incremented', () => {
      const previousVotes = [
        ['fd2b8704-e44f-434a-afcd-6aea4103f51d', 'upvote'],
        ['d74cd0f9-1afa-4a67-9d7c-6c38639ce362', 'upvote'],
        ['65551634-6071-490a-98b8-176eb75ecca3', 'upvote'],
        ['9f4b72a8-45bc-4436-b537-74e19da2fd19', 'downvote']
      ];
  
      let memberId = '90a2c5d3-7e56-4aec-9500-8f68a5e3fbc1';
    });

    test('upvote existing: as a level 1 member, when I downvote a comment with existing votes that I have not yet upvoted, the comment score should get incremented', () => {
      const previousVotes = [
        ['fd2b8704-e44f-434a-afcd-6aea4103f51d', 'upvote'],
        ['d74cd0f9-1afa-4a67-9d7c-6c38639ce362', 'upvote'],
        ['65551634-6071-490a-98b8-176eb75ecca3', 'upvote'],
        ['9f4b72a8-45bc-4436-b537-74e19da2fd19', 'downvote']
      ];
  
      let memberId = '90a2c5d3-7e56-4aec-9500-8f68a5e3fbc1';
    });

  });
  
})
