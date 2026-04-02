import { get, post, put, remove } from "./api";

export function listPlates(database) {
  const query = database
    ? `?database=${encodeURIComponent(database)}`
    : "";

  return get(`/meals${query}`);
}

export function createPlate(payload) {
  return post("/meals", payload);
}

export function updatePlate(id, payload) {
  return put(`/meals/${id}`, payload);
}

export function deletePlate(id, database) {
  return remove(`/meals/${id}`, database ? { database } : undefined);
}
