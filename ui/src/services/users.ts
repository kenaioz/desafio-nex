import { API } from "./api";

interface BaseUser {
  fullName: string;
  email: string;
  cpf: string;
  password: string;
  admin?: boolean;
}

interface TimeStamps {
  createdAt: string;
  updatedAt: string;
}

type User = BaseUser & TimeStamps;

async function fetchAllUsers() {
  const api = new API();

  const response = await api.get<User[]>("/users");

  return response;
}

async function fetchUserByEmail(email: string) {
  const api = new API();

  const response = await api.get<User>(`/users/${email}`);

  return response;
}

async function createUser(user: BaseUser) {
  const api = new API();

  const response = await api.post<BaseUser>("/users/register", {
    body: JSON.stringify(user),
  });

  return response;
}

export { fetchAllUsers, fetchUserByEmail, createUser };
