import { MemberDTO } from "./members";

export type CommentDTO = {
  id: string;
  text: string;
  dateCreated: string;
  member: MemberDTO;
};