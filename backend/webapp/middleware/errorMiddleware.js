// TODO:
module.exports = (
  { status = 500, message = "Something went wrong" },
  req,
  res,
  next
) => {
  res.status(status).json({
    type: "",
    title: message,
    detail: message,
    instance: "",
  });
};
