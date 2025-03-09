import nodemailer from 'nodemailer';
import hbs from 'handlebars';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path'
dotenv.config();



const email = process.env.EMAIL_USER
const password = process.env.EMAIL_PASSWORD
const host = process.env.EMAIL_HOST
const port = Number(process.env.EMAIL_PORT);
const nodeEnv = process.env.NODE_ENV

interface Idata {
    name: string,
    email?:string,
    link?: string,
    date?: string,
    time?: string,
    counselorName?:string,
    counselorEmail?:string
}

const transporter = nodemailer.createTransport({
    host: host,
    auth: {
        user: email,
        pass: password
    },
    port: port,
    tls: {
        rejectUnauthorized: false
    },
    secure: false
});

const sendEmail = async(emailType:string, recipient:string, data:Idata | null) => {
    let subject;

    if(emailType == 'welcome'){
        subject = 'Welcome to the Humeka family'
    }else if(emailType == 'book'){
        subject = 'Appointment Confirmation'
    }else if(emailType == 'bookC'){
        subject = 'New Appointment'  
    }else if(emailType == 'cancel'){
        subject = 'Appointment Cancellation'
    }

    const templatePath = nodeEnv === 'DEV' ? path.join(__dirname, 'templates', `${emailType}.html`) : `./dist/helpers/emails/templates/${emailType}.html`;
    const templateFile = fs.readFileSync(templatePath, 'utf-8');
    const template = hbs.compile(templateFile); 
    const html = template(data);
    
    const mailOptions = {
        from: 'Humeka Organization',
        to: recipient,
        subject: subject,
        html: html
    };

    const response = await transporter.sendMail(mailOptions)
    return response  
}

export default sendEmail