import {CommentatorInfo} from "../input-output-types/comment-types";

export type CommentDBType = {
    _id: string;
    content: string;
    postId: string;
    "commentatorInfo": CommentatorInfo,
    "createdAt": string;
}