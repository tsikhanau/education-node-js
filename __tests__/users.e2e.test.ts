import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {connectToDB} from "../src/db/mongo-db";
import {userRepository} from "../src/users/userReposetory";
import {jwtService} from "../src/helpers/jwt.service";

export const default_user = {
    login: 'user',
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
    it('should success login', async () => {
        const result = await userRepository.create(default_user);
        const user = {
            loginOrEmail: default_user.login,
            password: default_user.password
        }
        const res = await req
            .post('/auth/login')
            .send(user)
            .expect(200)

        if(result?.id) {
            const expectedResult = await jwtService.createToken(result.id.toString())
            expect(res.body.accessToken).toBe(expectedResult)
        }
    })
    it('should fail login', async () => {
        const result = await userRepository.create(default_user);
        const user = {
            loginOrEmail: default_user.login + 'aaa',
            password: default_user.password
        }
        const res = await req
            .post('/auth/login')
            .send(user)
            .expect(401)
    })
    it('should fail login because of incorrect payload', async () => {
        const result = await userRepository.create(default_user);
        const user = {
            loginOrEmail: 'a',
            password: 'A'
        }
        const res = await req
            .post('/auth/login')
            .send(user)
            .expect(400)
    })
    it('should return user data', async () => {
        const result = await userRepository.create(default_user);
        const user = {
            loginOrEmail: default_user.login,
            password: default_user.password
        }
        const res = await req
            .post('/auth/login')
            .send(user)

        const res2 = await req
            .get('/auth/me')
            .set({'Authorization': 'Bearer ' + res.body.accessToken})
            .expect(200)

        expect(res2.body.email).toBe(default_user.email)
        expect(res2.body.login).toBe(default_user.login)
    })
})