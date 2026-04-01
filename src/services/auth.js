import { post } from "./api";

export function login(payload) {
  return post("/auth/login", payload);
}

export function register(payload) {
  return post("/auth/register", payload);
}
