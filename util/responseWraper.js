export default function parseAndSend(
  res,
  status = true,
  statusCode = 500,
  message,
  data
) {
  return res.status(statusCode).send({ status, statusCode, message, data });
}
