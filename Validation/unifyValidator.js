const validator = (validationSchema) => (req, res ,next) => {

      const { body } = req
      const validationResult = validationSchema.validate(body)
  
      console.log({reqBody: req.body, validationResult})
  
      if(validationResult.error) {
          next(new ApiError(400, validationResult.error.message))
      }
  
      next()
  }
  
  module.exports = validator
  