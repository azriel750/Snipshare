import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";

export abstract class Controller {
  protected request: AuthRequest; 
  protected response: Response;

  constructor(request: AuthRequest, response: Response) {
    this.request = request;
    this.response = response;
  }

  protected json(data: any, status = 200) {
    return this.response.status(status).json(data);
  }

  protected error(message: string, status = 400) {
    return this.response.status(status).json({ error: message });
  }
}
