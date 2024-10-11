export interface ApiResponse {
  message?: string;
  info: unknown;
}

export interface ErrorApiResponse {
  errors: {
    message: string;
    type: string;
    value: string;
    path: string;
    location: string;
  }[];
}
