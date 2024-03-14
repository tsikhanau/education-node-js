import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {blogCollection, connectToDB} from "../src/db/mongo-db";
import {blogRepository} from "../src/blogs/blogRepository";
import {ObjectId} from "mongodb";

const buff2 = Buffer.from(SETTINGS.ADMIN_AUTH, 'utf8')
const codedAuth = buff2.toString('base64');
describe('/blogs', () => {
    beforeAll(async () => {
        await connectToDB();
        await blogCollection.drop();
    })

    it('should get empty array', async () => {
        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)

        expect(res.body.length).toBe(0)
    })
    it('should return data', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});

        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)

        expect(res.body.length).toBe(1)
    })
    it('should create', async () => {
        const blog = await blogRepository.create({name: 'b1',
            description: 'd1',
            websiteUrl: 'https://someurl.com'});

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(blog)
            .expect(201)
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
            websiteUrl: blogDetails.websiteUrl,
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
            websiteUrl: blogDetails.websiteUrl,
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