import {Request, Response} from "express";
import {userRepository} from "../users/userReposetory";
import nodemailer from "nodemailer";
import {ObjectId} from "mongodb";

export const registrationEmailResendingController = async (req: Request<any, any, {email: string}>, res: Response) => {
    const user = await userRepository.findByLoginOrEmail(req.body.email);
    if(user) {
        const transport = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: 'alex1.july1@mail.ru',
                pass: 'iQzyXRdMHvegwzyDYpBb'
            }
        });

        const code = await userRepository.updateConfirmation(new ObjectId(user._id));
        if(code.confirmationCode) {
            const result = await transport.sendMail({
                from: 'alex1.july1@mail.ru',
                to: user?.email,
                subject: 'registration',
                html: `<h1>Thanks for your registration</h1>
           <p>To finish registration please follow the link below:
               <a href='https://somesite.com/confirm-registration?code=${code.confirmationCode}'>complete registration</a>
           </p>`
            })
            res.status(204).json({});
        }
    }
}