const user = (req, res, next) => {
    if (req.user.id === req.params.id) {
        next();
    } else {
        res.status(403).json({message: "Forbidden. You dont have an access to this user details"});
    }
  }
  
  module.exports = {
    user
  };
  