import moment from "moment";

export default async function logEvents(request, userId, userName, urlAccess) {
  try {
    const db = request.app.locals.db;
    const log = db.collection("log");

    await log.insertOne({
      userId: userId || null,
      userName: userName || null,
      urlAccess: urlAccess || null,
      createdAt: moment().format("LTS"),
    });
  } catch (e) {
    throw e;
  }
}
