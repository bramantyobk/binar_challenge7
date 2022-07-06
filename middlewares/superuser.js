const superuser = (req, res, next) => {
  if (req.user.username === "admin") {
      next();
  } else {
      res.status(403).json({message: "Forbidden. Please log in as administrator"});
  }
}

module.exports = {
  superuser
};
