import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError, errorHandler } from './api-middleware';

type Handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void | NextApiResponse>;

export const apiHandler = (handler: Handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (err) {
      const error = errorHandler(err as Error);
      res.status(error.status).json(error);
    }
  };
};

export const withValidation = (schema: any, handler: Handler) => {
  return apiHandler(async (req, res) => {
    if (schema) {
      req.body = schema.parse(req.body);
    }
    return handler(req, res);
  });
};

export const withAuth = (handler: Handler) => {
  return apiHandler(async (req, res) => {
    // We'll implement this later when we add authentication
    const user = req.headers.authorization;
    
    if (!user) {
      throw new ApiError(401, 'Unauthorized');
    }
    
    return handler(req, res);
  });
};