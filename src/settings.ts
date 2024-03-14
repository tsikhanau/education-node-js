import {config} from 'dotenv'
config()

export const SETTINGS = {
    PORT: process.env.PORT || 3003,
    MONGO_URL: process.env.MONGO_URL,
    DB_NAME: 'bd_test',
    BLOG_COLLECTION_NAME: 'blogs',
    POST_COLLECTION_NAME: 'posts',
    ADMIN_AUTH: 'admin:qwerty',
    PATH: {
        VIDEOS: '/videos',
        POSTS: '/posts',
        BLOGS: '/blogs'
    },
}