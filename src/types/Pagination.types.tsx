export interface PaginationProps {

  pagination: {
    currentCount: number;
    totalCount: number;
    page: number;
    totalPage: number;
    items: number;

  }
}


export const initialPaginationValues = {

  currentCount: 1,
  totalCount: 1,
  page: 1,
  items: 4,
  totalPage: 1,
}