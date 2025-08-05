interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

class ApiResponse<T = any> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
  pagination?: PaginationMeta;

  constructor(
    statusCode: number,
    data: T,
    message = "Success",
    pagination?: PaginationMeta
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    if (pagination) {
      this.pagination = pagination;
    }
  }
}

export default ApiResponse;
