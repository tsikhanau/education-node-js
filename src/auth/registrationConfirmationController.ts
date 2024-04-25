import {Request, Response} from "express";
import {userRepository} from "../users/userReposetory";

export const registrationConfirmationController = async (req: Request<any, any, {code: string}>, res: Response) => {
    const result = await userRepository.markAsConfirmed(req.body.code);
    if(!result) {
        res.status(400).json({})
        return;
    }
    return res.status(204).json({})
}