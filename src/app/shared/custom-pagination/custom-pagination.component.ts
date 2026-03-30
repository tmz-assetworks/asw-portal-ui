import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss'],
})
export class CustomPaginationComponent implements OnChanges {

  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() totalCount!: number;
  @Input() pageSize!: number;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  jumpPageNumber!: number;

  ngOnChanges(): void {
    this.jumpPageNumber = this.currentPage;
  }

  goFirst(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(1);
    }
  }

  goPrevious(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  goNext(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  goLast(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.totalPages);
    }
  }

  goToPage(): void {
    if (
      this.jumpPageNumber >= 1 &&
      this.jumpPageNumber <= this.totalPages
    ) {
      this.pageChange.emit(this.jumpPageNumber);
    }
  }

  onPageSizeChange(): void {
    this.pageSizeChange.emit(this.pageSize);
  }
  
}