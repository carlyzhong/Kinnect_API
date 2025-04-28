exports.handleEndpointError = (req, res) => {
  res.status(404).send({ msg: "Nothing to see here!" });
};
