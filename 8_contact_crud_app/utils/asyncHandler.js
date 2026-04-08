import mongoose from 'mongoose';

export const asyncHandler = (fn) => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const validateObjectId = (paramName) => (req, res, next) => {
  const id = req.params[paramName];

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).render('errors/400', {
      message: 'Invalid ID',
    });
  }

  next();
};
