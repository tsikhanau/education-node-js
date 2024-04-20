import {connectToDB} from "../src/db/mongo-db";
import {blogRepository} from "../src/blogs/blogRepository";
import {postRepository} from "../src/posts/postRepository";
import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {userRepository} from "../src/users/userReposetory";
import {default_user} from "./users.e2e.test";
import {CommentOutputType} from "../src/input-output-types/comment-types";
import {commentRepository} from "../src/comments/commentRepository";

describe('/comments', () => {
    beforeAll(async () => {
        await connectToDB();
        await blogRepository.drop();
        await postRepository.drop();
        await userRepository.drop();
        await commentRepository.drop();
    })

    it('should delete comment', async () => {
        await userRepository.create(default_user);
        await userRepository.create({...default_user, login: 'user1'});

        const user = {
            loginOrEmail: default_user.login,
            password: default_user.password
        }

        const user1 = {
            loginOrEmail: 'user1',
            password: default_user.password
        }
        const userRes = await req
            .post('/auth/login')
            .send(user)
        const userRes1 = await req
            .post('/auth/login')
            .send(user1)
        const blog = await blogRepository.create({
            name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'
        });


        const newPost = await postRepository.create({
            title: 't1',
            shortDescription: 'd1',
            content: 'c1',
            blogId: blog.id?.toString() as string,
        })
        const content = {
            content: 'A'.repeat(21)
        };

        // @ts-ignore
        const commentRes: CommentOutputType = await req
            .post(SETTINGS.PATH.POSTS + '/' + newPost.id?.toString() + '/comments')
            .set({'Authorization': 'Bearer ' + userRes.body.accessToken})
            .send(content)
        await req
            .delete(SETTINGS.PATH.COMMENTS + '/111111111111111111111111')
            .set({'Authorization': 'Bearer ' + userRes.body.accessToken})
            .expect(404)
        await req
            //@ts-ignore
            .delete(SETTINGS.PATH.COMMENTS + '/' + commentRes.body.id)
            .set({"Authorization":"Bearer YWRtaW46cXdlcnR5"})
            .expect(401)

        await req
            //@ts-ignore
            .delete(SETTINGS.PATH.COMMENTS + '/' + commentRes.body.id)
            .set({'Authorization': 'Bearer ' + userRes1.body.accessToken})
            .expect(403)
        await req
            //@ts-ignore
            .delete(SETTINGS.PATH.COMMENTS + '/' + commentRes.body.id)
            .set({'Authorization': 'Bearer ' + userRes.body.accessToken})
            .expect(204)

    })
})