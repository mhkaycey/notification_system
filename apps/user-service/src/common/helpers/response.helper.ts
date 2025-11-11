import {
  ApiResponse,
  PaginationMeta,
} from '../interfaces/api-response.interface';

export class ResponseHelper {
  static success<T>(
    data: T,
    message = 'Operation successful',
    meta?: PaginationMeta,
  ): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
      ...(meta && { meta }),
    };
  }

  static error(error: string, message = 'Operation failed'): ApiResponse {
    return {
      success: false,
      error,
      message,
    };
  }

  static paginate<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message = 'Data retrieved successfully',
  ): ApiResponse<T[]> {
    const total_pages = Math.ceil(total / limit);

    return {
      success: true,
      data,
      message,
      meta: {
        total,
        limit,
        page,
        total_pages,
        has_next: page < total_pages,
        has_previous: page > 1,
      },
    };
  }
}
