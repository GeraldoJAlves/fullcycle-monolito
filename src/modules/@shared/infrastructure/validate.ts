import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export default (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(error.format());
      }

      return res.status(500).send();
    }
  };
