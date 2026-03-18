export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly details?: any;

  constructor(statusCode: number, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err: Error) => {
  if (err instanceof ApiError) {
    return {
      status: err.statusCode,
      message: err.message,
      details: err.details,
    };
  }

  // Default to 500 server error
  return {
    status: 500,
    message: 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  };
};

export const validateBody = <T>(schema: any, data: any): T => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw new ApiError(400, 'Validation Error', {
      details: error.details.map((err: any) => ({
        message: err.message,
        path: err.path,
      })),
    });
  }

  return value;
};