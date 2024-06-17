export type UseApiRequestStatus = "NONE" | "LOADING" | "ERROR" | "SUCCESS";

export interface PaginationInfo {
  page: number;
  perPage: number;
  totalPages: number;
  totalProducts: number;
  nextPage: number | null;
  prevPage: number | null;
}

export type PaginatedData<Data> = {
  data: Data;
  pagination: PaginationInfo;
};

export type Option<ExtraData = any> = {
  value: string;
  label: string;
  id:string|number,
  extraData?:ExtraData
};

export interface OptionWithComponent<ExtraData = any> extends Omit<Option,"label"|"extraData"> {
  label:JSX.Element
  extraData?:ExtraData
};


export type StyleConfig = { classNameStyle: string };

export type QueryObject = { [key: string]: string }


export type Variant = "ghost" | "outline" | "solid" | "link" | "unstyled"
export type ColorSheme ="whiteAlpha" | "blackAlpha" | "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "cyan" | "purple" | "pink"
export type Size ="lg" | "md" | "sm" | "xs"