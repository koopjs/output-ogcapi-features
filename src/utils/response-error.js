module.exports = function responseError(req, res, error) {
  console.error(error);

  const errorCode = error.code || 500;
  res.status(errorCode).json({
    code: errorCode,
    description: error.message
  });
};
