export interface ResponseError extends Error {
  statusCode?: number;
  field?: string;
}