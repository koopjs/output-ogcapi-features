module.exports = function responseError(req, res, error) {
  const errorCode = error.code || 500;
  res.status(errorCode).json({
    code: errorCode,
    description: error.message
  });
};
