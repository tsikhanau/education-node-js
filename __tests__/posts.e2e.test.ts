import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {connectToDB} from "../src/db/mongo-db";
import {blogRepository} from "../src/blogs/blogRepository";
import {postRepository} from "../src/posts/postRepository";
import {ObjectId} from "mongodb";
import {InputPostType} from "../src/input-output-types/blog-types";

export const generatePosts = (length: number): InputPostType[] => {
    return [...Array(length).keys()].map(i => ({
        title: 't' + i,
        shortDescription: 'd' + i,
        content: 'c' + i,
    }))
}
const buff2 = Buffer.from(SETTINGS.ADMIN_AUTH, 'utf8')
const codedAuth = buff2.toString('base64');
describe('/posts', () => {
    beforeAll(async () => {
        await connectToDB();
        await blogRepository.drop();
        await postRepository.drop();
    })

    it('should get empty array', async () => {
        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200)

        expect(res.body.items.length).toBe(0)
    })
    it('should return data', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});

        const newPost = await postRepository.create({
            title: 't1',
            shortDescription: 'd1',
            content: 'c1',
            blogId: blog.id?.toString() as string,
        })
        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200)
        expect(res.body.items.length).toBe(1)
    })
    it('should return paginated data', async () => {
        const postsList = generatePosts(40);
                const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});
        const data = await postRepository.createMany(postsList, blog.id?.toString() as string);

        const res = await req
            .get(SETTINGS.PATH.POSTS + '?pageNumber=1&pageSize=10&sortBy=title&sortDirection=asc')
            .expect(200)

        expect(res.body.items.length).toBe(10)
        expect(res.body.pagesCount).toBe(4)
        expect(res.body.page).toBe(1)
        expect(res.body.pageSize).toBe(10)
        expect(res.body.totalCount).toBe(40)
        expect(res.body.items[0].title).toBe('t0')
    })
    it('should return paginated data with search', async () => {
        const postsList = generatePosts(40);
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});
        const data = await postRepository.createMany(postsList, blog.id?.toString() as string);
        const searchText = 't0'
        const res = await req
            .get(SETTINGS.PATH.POSTS + `?searchNameTerm=${searchText}`)
            .expect(200)

        expect(res.body.totalCount).toBe(1)
        expect(res.body.items[0].title).toBe(searchText)
    })
    it('should create', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});
        const newPost = {
            title: 't1',
            shortDescription: 'd1',
            content: 'c1',
            blogId: blog.id?.toString(),
        }

        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newPost)
            .expect(201)
        expect(res.body.blogId).toEqual(newPost.blogId)
    })
    it('shouldn\'t create', async () => {
        const newPost = {
            title: null,
            shortDescription: '',
            content: 'c1',
            blogId: 'blogId'
        }

        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newPost)
            .expect(400)
    })
    it('shouldn\'t find', async () => {
        const res = await req
            .get(SETTINGS.PATH.POSTS + '/111111111111111111111111')
            .expect(404)
    })
    it('should find', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});
        const newPost = await postRepository.create({
            title: 't1',
            shortDescription: 'd1',
            content: 'c1',
            blogId: blog.id?.toString() as string,
        })
        const res = await req
            .get(SETTINGS.PATH.POSTS + '/' + newPost.id?.toString())
            .expect(200)
    })
    it('should update', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});

        const newPost = await postRepository.create({
            title: 't1',
            shortDescription: 'd1',
            content: 'c1',
            blogId: blog.id?.toString() as string,
        })

        const postDetails = await postRepository.find(new ObjectId(newPost.id));

        const updatedPost = {
            title: 't11',
            content: 'c12',
            shortDescription: 'd13',
            blogId: postDetails?.blogId,
            blogName: postDetails?.blogName
        }

        const res = await req
            .put(SETTINGS.PATH.POSTS + '/' + newPost.id?.toString())
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedPost)
            .expect(204)
    })
    it('shouldn\'t update because of incorrect payload', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});

        const newPost = await postRepository.create({
            title: 't1',
            shortDescription: 'd1',
            content: 'c1',
            blogId: blog.id?.toString() as string,
        })

        const updatedPost = {
            title: 't11',
            content: 'c12',
            shortDescription: 'd13',
        }

        const res = await req
            .put(SETTINGS.PATH.POSTS + '/' + newPost.id?.toString())
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedPost)
            .expect(400)
    })
    it('shouldn\'t update because of incorrect id', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});

        const newPost = await postRepository.create({
            title: 't1',
            shortDescription: 'd1',
            content: 'c1',
            blogId: blog.id?.toString() as string,
        })

        const postDetails = await postRepository.find(new ObjectId(newPost.id));

        const updatedPost = {
            title: 't11',
            content: 'c12',
            shortDescription: 'd13',
            blogId: postDetails?.blogId,
            blogName: postDetails?.blogName
        }

        const res = await req
            .put(SETTINGS.PATH.POSTS + '/111111111111111111111111')
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedPost)
            .expect(404)
    })
    it('should delete', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});

        const newPost = await postRepository.create({
            title: 't1',
            shortDescription: 'd1',
            content: 'c1',
            blogId: blog.id?.toString() as string,
        })
        const res = await req
            .delete(SETTINGS.PATH.POSTS + '/' + newPost.id?.toString())
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(204)
    })
    it('shouldn\'t delete', async () => {
        const res = await req
            .delete(SETTINGS.PATH.POSTS + '/111111111111111111111111')
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(404)
    })
})