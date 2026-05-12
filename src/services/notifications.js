import { get, put } from "./api";

export function listNotifications(database) {
  const query = database
    ? `?database=${encodeURIComponent(database)}`
    : "";

  return get(`/notifications${query}`);
}

export function markAllNotificationsAsRead(database) {
  return put("/notifications/read-all", database ? { database } : {});
}
