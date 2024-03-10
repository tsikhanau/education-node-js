import {config} from 'dotenv'
config()

export const SETTINGS = {
    PORT: process.env.PORT || 3003,
    ADMIN_AUTH: 'admin:qwerty',
    PATH: {
        VIDEOS: '/videos',
        POSTS: '/posts',
        BLOGS: '/blogs'
    },
}