import { get, post, put, remove } from "./api";

export function listMenus(database) {
  const query = database
    ? `?database=${encodeURIComponent(database)}`
    : "";

  return get(`/menus${query}`);
}

export function createMenu(payload) {
  return post("/menus", payload);
}

export function updateMenu(id, payload) {
  return put(`/menus/${id}`, payload);
}

export function deleteMenu(id, database) {
  return remove(`/menus/${id}`, database ? { database } : undefined);
}
