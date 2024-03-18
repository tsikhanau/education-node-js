import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {connectToDB} from "../src/db/mongo-db";
import {blogRepository} from "../src/blogs/blogRepository";
import {ObjectId} from "mongodb";
import {generatePosts} from "./posts.e2e.test";
import {postRepository} from "../src/posts/postRepository";
import {InputPostType} from "../src/input-output-types/blog-types";
const generateBlogs = (length: number) => {
    return [...Array(length).keys()].map(i => ({
        name: 'b' + i,
        description: 'd' + i,
        websiteUrl: 'https://someurl.com'
    }))
}
const buff2 = Buffer.from(SETTINGS.ADMIN_AUTH, 'utf8')
const codedAuth = buff2.toString('base64');
describe('/blogs', () => {
    beforeAll(async () => {
        await connectToDB();
        await blogRepository.drop();
    })

    it('should get empty array', async () => {
        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)

        expect(res.body.items.length).toBe(0)
    })
    it('should return data', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});

        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)

        expect(res.body.items.length).toBe(1)
    })
    it('should return paginated data', async () => {
        const blogsList = generateBlogs(40);
        const data = await blogRepository.createMany(blogsList);

        const res = await req
            .get(SETTINGS.PATH.BLOGS + '?pageNumber=1&pageSize=10&sortBy=name&sortDirection=asc')
            .expect(200)

        expect(res.body.items.length).toBe(10)
        expect(res.body.pagesCount).toBe(4)
        expect(res.body.page).toBe(1)
        expect(res.body.pageSize).toBe(10)
        expect(res.body.totalCount).toBe(40)
        expect(res.body.items[0].name).toBe('b0')
    })
    it('should return paginated data with search', async () => {
        const blogsList = generateBlogs(40);
        const data = await blogRepository.createMany(blogsList);
        const searchText = 'b0'
        const res = await req
            .get(SETTINGS.PATH.BLOGS + `?searchNameTerm=${searchText}`)
            .expect(200)

        expect(res.body.totalCount).toBe(1)
        expect(res.body.items[0].name).toBe(searchText)
    })
    it('should return paginated posts', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});

        const blogId = blog.id?.toString() as string;
        const postsList: InputPostType[] = generatePosts(40);
        const data = await postRepository.createMany(postsList, blogId);
        const res = await req
            .get(SETTINGS.PATH.BLOGS + `/${blogId}/posts?sortBy=title&sortDirection=asc`)
            .expect(200)
        expect(res.body.items.length).toBe(10)
        expect(res.body.pagesCount).toBe(4)
        expect(res.body.page).toBe(1)
        expect(res.body.pageSize).toBe(10)
        expect(res.body.totalCount).toBe(40)
        expect(res.body.items[0].title).toBe('t0')
    })
    it('should create post', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});

        const blogId = blog.id?.toString() as string;

        const newPost = {
            title: 't1',
            shortDescription: 'd1',
            content: 'c1',
        }

        const res = await req
            .post(SETTINGS.PATH.BLOGS + '/' + blogId + "/posts")
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newPost)
            .expect(201)

        expect(res.body.blogId).toEqual(blogId)
    })
    it('should create', async () => {
        const blog = {
            name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'};
        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(blog)
            .expect(201)
        expect(res.body.name).toBe('b1')
    })
    it('shouldn\'t create', async () => {
        const newBlog = {
            name: null,
            description: '',
        }

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newBlog)
            .expect(400)
    })
    it('shouldn\'t find', async () => {
        const res = await req
            .get(SETTINGS.PATH.BLOGS + '/111111111111111111111111')
            .expect(404)
    })
    it('should find', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});
        const res = await req
            .get(SETTINGS.PATH.BLOGS + '/' + blog.id?.toString())
            .expect(200)
    })
    it('should update', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});

        const blogDetails = await blogRepository.find(blog.id as ObjectId);

        const updatedBlog = {
            name: 'b11',
            description: 'd11',
            websiteUrl: blogDetails?.websiteUrl,
        }

        const res = await req
            .put(SETTINGS.PATH.BLOGS + '/' + blog.id?.toString())
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedBlog)
            .expect(204)
    })
    it('shouldn\'t update because of incorrect payload', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});

        const updatedBlog = {
            name: 't11',
        }

        const res = await req
            .put(SETTINGS.PATH.BLOGS + '/' + blog.id?.toString())
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedBlog)
            .expect(400)
    })
    it('shouldn\'t update because of incorrect id', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});

        const blogDetails = await blogRepository.find(blog.id as ObjectId);

        const updatedBlog = {
            name: 'b11',
            description: 'd11',
            websiteUrl: blogDetails?.websiteUrl,
        }

        const res = await req
            .put(SETTINGS.PATH.BLOGS + '/111111111111111111111111')
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedBlog)
            .expect(404)
    })
    it('should delete', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});

        const res = await req
            .delete(SETTINGS.PATH.BLOGS + '/' + blog.id?.toString())
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(204)
    })
    it('shouldn\'t delete', async () => {
        const res = await req
            .delete(SETTINGS.PATH.BLOGS + '/111111111111111111111111')
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(404)
    })
})