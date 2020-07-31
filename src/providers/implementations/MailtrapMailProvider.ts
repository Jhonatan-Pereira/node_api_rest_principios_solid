import { IMailProvider, IMessage } from './../IMailProvider';
import nodemaier from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';

export class MailtrapMailProvider implements IMailProvider {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemaier.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: 'f8ade14b7e426d',
                pass: '1c49f5a4658de1'
            }
        })
    }
    
    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: message.subject,
            html: message.body
        })
    }
}