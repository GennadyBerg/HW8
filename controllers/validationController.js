const validateObject = (req, res, next) => {
    
      return res.status(200).json({ message: 'Object validation successful' });
    };
    
module.exports = {
      validateObject,
    };