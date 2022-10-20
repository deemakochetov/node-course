const createUser = (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(StatusCodes.CREATED).send(user);
    })
    .catch((e) => {
      res.status(StatusCodes.BAD_REQUEST).send(e);
    });
});

module.exports = { createUser }