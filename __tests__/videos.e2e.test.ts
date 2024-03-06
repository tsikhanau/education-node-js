import {req} from './test-helpers';
import {SETTINGS} from '../src/settings';
import {setDB} from "../src/db/db";
import {dataset1} from "./datasets";
import {Resolutions} from "../src/input-output-types/video-types";

describe('/videos', () => {
    beforeAll(async () => {
        // await req.delete('/testing/all-data')
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