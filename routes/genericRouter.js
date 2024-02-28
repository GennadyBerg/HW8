const express = require('express');
const { ApiError } = require('../middleware/ApiError');
const genericRouter = express.Router();

genericRouter.use(function(req, res, next) {
      if (!req.route)
          return next (new ApiError(404, "Route not found."));  
      next();
  });
  
module.exports = genericRouter;
