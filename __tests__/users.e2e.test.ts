import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {connectToDB} from "../src/db/mongo-db";
import {userRepository} from "../src/users/userReposetory";

const default_user = {
    login: 'b1',
    email: 'someurl@test.com',
    password: 'abc123ABC'
}
const buff2 = Buffer.from(SETTINGS.ADMIN_AUTH, 'utf8')
const codedAuth = buff2.toString('base64');
describe('/blogs', () => {
    beforeAll(async () => {
        await connectToDB();
        await userRepository.drop();
    })

    it('should get empty array', async () => {
        const res = await req
            .get(SETTINGS.PATH.USERS)
            .expect(200)

        expect(res.body.items.length).toBe(0)
    })
    it('should return data', async () => {
        const blog = await userRepository.create(default_user);

        const res = await req
            .get(SETTINGS.PATH.USERS)
            .expect(200)

        expect(res.body.items.length).toBe(1)
    })
    it('should create', async () => {

        const res = await req
            .post(SETTINGS.PATH.USERS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(default_user)
            .expect(201)
        expect(res.body.login).toBe(default_user.login)
    })
    it('shouldn\'t create', async () => {
        const newUser = {
            login: null,
            password: '',
        }

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newUser)
            .expect(400)
    })
    it('should delete', async () => {
        const user = await userRepository.create(default_user);

        const res = await req
            .delete(SETTINGS.PATH.USERS + '/' + user.id?.toString())
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(204)
    })
    it('shouldn\'t delete', async () => {
        const res = await req
            .delete(SETTINGS.PATH.USERS + '/111111111111111111111111')
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(404)
    })
})