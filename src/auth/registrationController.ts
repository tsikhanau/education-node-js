import {Request, Response} from "express";
import {InputRegistrationType} from "../input-output-types/auth-types";

export const registrationController = async (req: Request<any, any, InputRegistrationType>, res: Response) => {

    res.status(201).json({});
}