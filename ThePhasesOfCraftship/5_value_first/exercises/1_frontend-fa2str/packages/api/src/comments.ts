import { DTOs as MemberDTOs } from "./members";

export namespace DTOs {
  export type CommentDTO = {
    id: string;
    text: string;
    dateCreated: string;
    member: MemberDTOs.MemberDTO;
  };
}

