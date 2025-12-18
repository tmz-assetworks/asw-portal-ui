import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-support-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './support-modal.component.html',
  styleUrls: ['./support-modal.component.scss']
})
export class SupportModalComponent {
  // Emit when modal should close
  @Output() close = new EventEmitter<void>();

  // Close on ESC
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(): void {
    this.close.emit();
  }

  // Backdrop click handler - close if backdrop clicked
  onBackdropClick(evt: MouseEvent): void {
    const target = evt.target as HTMLElement;
    if (target && target.classList.contains('support-backdrop')) {
      this.close.emit();
    }
  }
}
