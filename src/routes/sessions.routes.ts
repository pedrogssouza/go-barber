import { Router } from "express";

import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    const { password: removePassword, ...rest } = user;

    return response.status(200).json({ rest, token });
  } catch (err) {
    return response.status(400).json({ error: (err as Error).message });
  }
});

export default sessionsRouter;
