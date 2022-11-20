import { type } from "os";

export type responseUser = {
  id?: string;
  createdAt?: number | null;
};

export type responseGroupCreate = {
  id: number;
  createdAt: string;
}