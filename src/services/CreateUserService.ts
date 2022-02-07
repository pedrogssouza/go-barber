import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import User from "../models/User";

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, password, email }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkIfUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkIfUserExists) {
      throw new Error("Já existe um usuário cadastrado com esse email");
    }

    const hashedPassword = await hash(password, 8);

    const newUser = usersRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    await usersRepository.save(newUser);

    return newUser;
  }
}

export default CreateUserService;
