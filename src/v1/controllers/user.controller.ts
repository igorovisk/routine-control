import { Request, Response, NextFunction } from "express";
import { UserLogic } from "../logic";

export class UserController {
   private logic: UserLogic;

   constructor() {
      this.logic = new UserLogic();
   }

   async getUsers(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await this.logic.getUsers(req, res);
         return res.status(200).send(response);
      } catch (error) {
         next(error);
      }
   }
   async getUserById(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await this.logic.getUserById(req, res);
         return res.status(200).send(response);
      } catch (error) {
         next(error);
      }
   }

   async createUser(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await this.logic.createUser(req, res);
         return res.status(200).send(response);
      } catch (error) {
         next(error);
      }
   }
   async updateUser(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await this.logic.updateUser(req, res);
         return res.status(200).send(response);
      } catch (error) {
         next(error);
      }
   }
   async getUserByEmail(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await this.logic.getUserByEmail(req, res);
         return res.status(200).send(response);
      } catch (error) {
         next(error);
      }
   }
}
