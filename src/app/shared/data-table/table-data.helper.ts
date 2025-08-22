import { Injectable } from '@angular/core';

export interface TableResponse<T> {
  data: T[];
  statusData?: any;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  isTableHasData: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TableDataHelper {
  /**
   * Normalizes paginated API response into a consistent structure
   */
  formatResponse<T>(res: any): TableResponse<T> {
    if (res?.data?.length > 0) {
      return {
        data: res.data,
        statusData: res.statusData,
        totalCount: res.paginationResponse?.totalCount ?? 0,
        totalPages: res.paginationResponse?.totalPages ?? 0,
        pageSize: res.paginationResponse?.pageSize ?? 10,
        isTableHasData: false
      };
    } else {
      return {
        data: [],
        statusData: res?.statusData,
        totalCount: 0,
        totalPages: 0,
        pageSize: res?.paginationResponse?.pageSize ?? 10,
        isTableHasData: true
      };
    }
  }
}
