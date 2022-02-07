import { Router } from "express";

import CreateUserService from "../services/CreateUserService";

const usersRouter = Router();

usersRouter.post("/", async (request, response) => {
  try {
    const { name, password, email } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    const { password: removePassword, ...rest } = user;

    return response.status(200).json(rest);
  } catch (err) {
    return response.status(400).json({ error: (err as Error).message });
  }
});

export default usersRouter;
