import moment from "moment";

export default async function logEvents(
  request,
  userId,
  userName,
  loginType,
  urlAccess,
  type,
  jsonRequest,
  jsonResponse
) {
  try {
    const db = request.app.locals.db;
    const log = db.collection("log");

    await log.insertOne({
      userId: userId || null,
      userName: userName || null,
      loginType,
      urlAccess: urlAccess || null,
      type,
      jsonRequest,
      jsonResponse,
      createdAt: moment().format("LTS"),
      ip:
        request.headers["x-forwarded-for"] || request.connection.remoteAddress,
    });
  } catch (e) {
    throw e;
  }
}
