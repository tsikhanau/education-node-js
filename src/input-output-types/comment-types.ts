export type InputCommentType = {
    content: string;
    commentatorInfo: CommentatorInfo,
}

export type InputCommentUpdateType = {
    content: string;
}

export type CommentatorInfo = {
    userId: string;
    userLogin: string;
}

export type InsertCommentType = {
    content: string;
    postId: string;
    commentatorInfo: CommentatorInfo,
    createdAt: string;
}

export type CommentType = {
    id: string;
    content: string;
    postId: string;
    commentatorInfo: CommentatorInfo,
    createdAt: string;
}

export type CommentOutputType = {
    id: string;
    content: string;
    commentatorInfo: CommentatorInfo,
    createdAt: string;

}