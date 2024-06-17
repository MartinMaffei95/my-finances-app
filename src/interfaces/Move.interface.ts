import { Category, CategoryAPI } from "./Category.interface";

// # APP DATA
export interface Move {
  id: number;
  type: MoveTypes;
  parsedType: string;
  value: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  category: Category;
}

export type MoveTypes = "INCOME" | "EXPENSE" | "TRANSFER";

// ### POST NEW MOVE OBJECT
export type MovePostObject = {
  type: MoveTypes;
  value: number;
  comment: string;
  account: number;
  category: number;
  createdAt: string;
  accountDestination?: number | undefined;
};

// # API DATA
export interface MoveAPI {
  id: number;
  type: MoveTypes;
  value: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  category: CategoryAPI;
}
