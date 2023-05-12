import { createTransport } from "nodemailer";
import { InternalServerError } from "../src/helpers/Errors.helper";
import Mailgen from "mailgen";

interface ISendEmailRequest {
  to: string;
  subject: string;
  text: string;
}

export class EmailService {
  async sendEmail({ to, subject, text }: ISendEmailRequest) {
    const transport = createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      to,
      subject,
      text,
    });
    try {
      await transport.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html: text,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerError("Error seding email, try again later");
    }
  }

  restPasswordTemplate(
    userEmail: string,
    userName: string,
    resetToken: string
  ) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Recuperação de senha - MOTORSHOP",
        link: process.env.FRONT_URL_REST_PASSWORD!,
      },
    });

    const email = {
      body: {
        name: userName,
        intro: "Recuperação de senha",
        action: {
          instructions:
            "Clique no botão abaixo para você criar um nova senha para poder acessar sua conta",
          button: {
            color: "#4529E6",
            text: "Criar nova senha",
            link: `${process.env.FRONT_URL_REST_PASSWORD!}?reset=${resetToken}`,
          },
        },
      },
    };

    const emailBody = mailGenerator.generate(email);
    const emailTemplate = {
      to: userEmail,
      subject: "Reset",
      text: emailBody,
    };

    return emailTemplate;
  }
}
