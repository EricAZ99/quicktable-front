import { get, post, put, remove } from "./api";

export function listTables(database) {
  const query = database
    ? `?database=${encodeURIComponent(database)}`
    : "";

  return get(`/tables${query}`);
}

export function createTable(payload) {
  return post("/tables", payload);
}

export function updateTable(id, payload) {
  return put(`/tables/${id}`, payload);
}

export function deleteTable(id, database) {
  return remove(`/tables/${id}`, database ? { database } : undefined);
}
