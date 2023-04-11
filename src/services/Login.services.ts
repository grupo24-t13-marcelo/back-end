import { compare } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/Errors.helper";
import { ILoginRequest } from "../interfaces/login.interfaces";
import { userRepository } from "../repositories";
import { LoginSchemas } from "../schemas/LoginSchemas";

export class LoginServices {
  async login(dataLogin: ILoginRequest) {
    const user = await userRepository.findOneBy({ email: dataLogin.email });

    if (!user) {
      throw new UnauthorizedError("Email or password invalid");
    }

    const isMatchPassword = await compare(dataLogin.password, user.password);

    if (!isMatchPassword) {
      throw new UnauthorizedError("Email or password invalid");
    }

    const token = jwt.sign({}, process.env.SECRET_KEY!, {
      expiresIn: "48h",
      subject: user.id,
    });

    const session = {
      token,
      user,
    };

    return LoginSchemas.LoginResponseSchema.validate(session, {
      stripUnknown: true,
    });
  }
}
