import { get, post, put, remove } from "./api";

export function listOrders(database) {
  const query = database
    ? `?database=${encodeURIComponent(database)}`
    : "";

  return get(`/orders${query}`);
}

export function createOrder(payload) {
  return post("/orders", payload);
}

export function updateOrder(id, payload) {
  return put(`/orders/${id}`, payload);
}

export function deleteOrder(id, database) {
  return remove(`/orders/${id}`, database ? { database } : undefined);
}
