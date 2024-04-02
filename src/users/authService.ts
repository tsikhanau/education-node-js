import {Request, Response} from 'express';
import {userRepository} from "./userReposetory";
import {bcryptService} from "./bcryptServeice";
import {AuthInput} from "../input-output-types/user_types";

export const authService = async (req: Request<any, any, AuthInput>, res: Response ) => {
    const user = await userRepository.findByLoginOrEmail(req.body.loginOrEmail);
    const isCorrect = await bcryptService.checkPassword(req.body.password, user?.password ?? '');

    if (!isCorrect) {
        res.status(401).json({});
        return
    }
    res.status(204).json({});
}