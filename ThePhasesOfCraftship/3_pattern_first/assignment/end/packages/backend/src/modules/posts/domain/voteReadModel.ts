import { VoteDTO } from "@dddforum/shared/src/api/posts";
import { Vote } from "@prisma/client";

export class VoteReadModel {
  public static fromPrisma (vote: Vote) {
    return new VoteReadModel();
  }

  public toDTO (): VoteDTO {
    return {
      
    }
  }
}
