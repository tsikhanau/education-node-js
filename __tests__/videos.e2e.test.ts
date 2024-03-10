import {req} from './test-helpers';
import {SETTINGS} from '../src/settings';
import {setDB} from "../src/db/db";
import {blog1, dataset1, post1} from "./datasets";
import {Resolutions} from "../src/input-output-types/video-types";

const buff2 = Buffer.from(SETTINGS.ADMIN_AUTH, 'utf8')
const codedAuth = buff2.toString('base64');
describe('/videos', () => {
    beforeAll(async () => {
        await req.delete('/testing/all-data')
    })

    it('should get empty array', async () => {
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        expect(res.body.length).toBe(0)
    })
    it('should get not empty array', async () => {
        setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        expect(res.body.length).toBe(1);
        expect(res.body[0]).toEqual(dataset1.videos[0]);
    })
    it('should create', async () => {
        setDB()
        const newVideo = {
            title: 't1',
            author: 'a1',
            availableResolutions: [Resolutions.P144]
        }

        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo)
            .expect(201)

        expect(res.body.availableResolutions).toEqual(newVideo.availableResolutions)
    })
    it('shouldn\'t find', async () => {
        setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.VIDEOS + '/1')
            .expect(404)
    })
    it('should find', async () => {
        setDB(dataset1);

        const id = dataset1.videos[0].id;

        const res = await req
            .get(SETTINGS.PATH.VIDEOS + '/' + id)
            .expect(200)
    })
    it('should delete', async () => {
        setDB(dataset1);

        const id = dataset1.videos[0].id;

        const res = await req
            .delete(SETTINGS.PATH.VIDEOS + '/' + id)
            .expect(204)
    })
    it('shouldn\'t delete', async () => {
        setDB(dataset1);

        const res = await req
            .delete(SETTINGS.PATH.VIDEOS + '/1')
            .expect(404)
    })
    it('should update', async () => {
        setDB(dataset1);

        const id = dataset1.videos[0].id;

        const updatedVideo = {
            ...dataset1.videos[0],
            title: 't1',
        }

        const res = await req
            .put(SETTINGS.PATH.VIDEOS + '/' + id)
            .send(updatedVideo)
            .expect(204)
    })
    it('shouldn\'t update because of incorrect payload', async () => {
        setDB(dataset1);

        const id = dataset1.videos[0].id;

        const updatedVideo = {
            author: 'a1',
            title: 't1',
        }

        const res = await req
            .put(SETTINGS.PATH.VIDEOS + '/' + id)
            .send(updatedVideo)
            .expect(400)
    })
    it('shouldn\'t update because of incorrect id', async () => {
        setDB(dataset1);

        const updatedVideo = {
            ...dataset1.videos[0],
            title: 't1',
        }

        const res = await req
            .put(SETTINGS.PATH.VIDEOS + '/1')
            .send(updatedVideo)
            .expect(404)
    })
})


describe('/posts', () => {
    beforeAll(async () => {
        await req.delete('/testing/all-data')
    })

    it('should get empty array', async () => {
        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200)

        expect(res.body.length).toBe(0)
    })
    it('should get not empty array', async () => {
        setDB(dataset1);

        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200)

        expect(res.body.length).toBe(1);
        expect(res.body[0]).toEqual(dataset1.posts[0]);
    })
    it('should create', async () => {
        setDB({blogs: [blog1]})
        const newPost = {
            title: 't1',
            shortDescription: 'd1',
            content: 'c1',
            blogId: blog1.id,
        }

        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newPost)
            .expect(201)

        expect(res.body.blogId).toEqual(newPost.blogId)
    })
    it('shouldn\'t create', async () => {
        setDB()
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
        setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.POSTS + '/1')
            .expect(404)
    })
    it('should find', async () => {
        setDB(dataset1);

        const id = dataset1.posts[0].id;

        const res = await req
            .get(SETTINGS.PATH.POSTS + '/' + id)
            .expect(200)
    })
    it('should update', async () => {
        setDB(dataset1);

        const {id, blogName, shortDescription, blogId, content} = post1;

        const updatedPost = {
            shortDescription,
            blogId,
            content,
            blogName,
            title: 't1',
        }

        const res = await req
            .put(SETTINGS.PATH.POSTS + '/' + id)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedPost)
            .expect(204)
    })
    it('shouldn\'t update because of incorrect payload', async () => {
        setDB(dataset1);

        const id = post1.id;

        const updatedPost = {
            title: 't1',
            content: 'c1',
            shortDescription: 'd1'
        }

        const res = await req
            .put(SETTINGS.PATH.POSTS + '/' + id)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedPost)
            .expect(400)
    })
    it('shouldn\'t update because of incorrect id', async () => {
        setDB(dataset1);

        const updatedPost = {
            title: 't1',
            content: 'c1',
            shortDescription: 'd1',
            blogId: dataset1.blogs[0].id
        }

        const res = await req
            .put(SETTINGS.PATH.POSTS + '/1')
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedPost)
            .expect(404)
    })
    it('should delete', async () => {
        setDB(dataset1);

        const id = dataset1.posts[0].id;

        const res = await req
            .delete(SETTINGS.PATH.POSTS + '/' + id)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(204)
    })
    it('shouldn\'t delete', async () => {
        setDB(dataset1);

        const res = await req
            .delete(SETTINGS.PATH.POSTS + '/1')
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(404)
    })
})