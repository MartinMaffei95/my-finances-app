// # APP DATA
export interface Category {
  id: number;
  name: string;
  icon?: string;
  color?: string;
  color2?: string;
  children?: Category[];
}

// # API DATA
export interface CategoryAPI {
  id: number;
  name: string;
  icon?: string;
  color?: string;
  color2?: string;
  children?: CategoryAPI[];
}

export interface PostNewCategory {
  name: string;
  parent?: number | undefined;
  icon?: string | undefined;
  color?: string | undefined;
  color2?: string | undefined;

}
