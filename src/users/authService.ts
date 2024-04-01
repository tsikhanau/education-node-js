import {Request, Response} from 'express';
import {userRepository} from "./userReposetory";
import {bcryptService} from "./bcryptServeice";

type AuthInput = {loginOrEmail: string, password: string}
export const authService = async (req: Request<any, any, AuthInput>, res: Response ) => {
    const user = await userRepository.findByLoginOrEmail(req.body.loginOrEmail);
    if (user) {
        const isCorrect = await bcryptService.checkPassword(req.body.password, user.password);
        res.status(isCorrect ? 204 : 401).json({});
    }
}