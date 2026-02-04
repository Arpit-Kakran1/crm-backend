export const notFound = (req, res, next) => {
  res.status(404);
  next(Object.assign(new Error(`Not Found - ${req.originalUrl}`), { statusCode: 404 }));
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode || 500;
  const message = err.message || 'Server Error';
  res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};

