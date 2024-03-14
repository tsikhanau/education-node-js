export type InputPostType = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
}

export type PostOutputType = {
    id: string;
    title: string;
}

export type PostType = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
}

export type InsertPostType = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
}
