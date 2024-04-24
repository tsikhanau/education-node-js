import {Request, Response} from "express";
import {InputRegistrationType} from "../input-output-types/auth-types";
import {userRepository} from "../users/userReposetory";
import nodemailer from 'nodemailer';
import {ObjectId} from "mongodb";

export const registrationController = async (req: Request<any, any, InputRegistrationType>, res: Response) => {
    const registration = await userRepository.createRegistrationData(req.body);
    if(registration.error) return;
    const user = await userRepository.findRegistered(new ObjectId(registration.id));
    const transport = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'alex1.july1@mail.ru',
            pass: 'iQzyXRdMHvegwzyDYpBb'
        }
    });

    const result = await transport.sendMail({
        from: 'alex1.july1@mail.ru',
        to: user?.password,
        subject: 'registration',
        html: `<h1>Thanks for your registration</h1>
           <p>To finish registration please follow the link below:
               <a href='https://somesite.com/confirm-email?code=${user?.confirmationCode}'>complete registration</a>
           </p>`
    })

    res.status(204).json({});
}