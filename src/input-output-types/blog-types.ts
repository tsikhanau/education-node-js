export type InputBlogType = {
    name: string;
    description: string;
    websiteUrl: string;
}

export type InsertBlogType = {
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    isMembership: boolean;
}

export type BlogType = {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    isMembership: boolean;
}