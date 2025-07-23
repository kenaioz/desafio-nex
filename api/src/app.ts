import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { routes } from './routes';

import { HttpError } from './utils/HttpError';

const app = express();

app.use(express.json());

app.use(routes);

app.use(
  (
    err: Error | HttpError,
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const statusCode = err instanceof HttpError ? err.statusCode : 500;

    console.error(
      `[Error] ${req.method} ${req.url} - ${err.message} - ${err.stack}`,
    );

    if (err instanceof HttpError) {
      return res.status(statusCode).json({
        error: true,
        message: err.message,
        statusCode,
      });
    }

    return res.status(500).json({
      error: true,
      message: 'Internal Server Error',
      description: err.message,
      statusCode: 500,
    });
  },
);

export default app;
