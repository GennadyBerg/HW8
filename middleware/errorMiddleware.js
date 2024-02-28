const errorHandler = (err, req, res, next) => {
      const a = "";
      if (res.headersSent) {
            return next(err);
      }
      if (err.statusCode) {
            res.status(err.statusCode).json({ status: err.statusCode, error: err.message });
      }
      else {
            console.error(err.stack);
            res.status(500).json({ error: 'Internal Server Error' });
      }
};

module.exports = errorHandler;
