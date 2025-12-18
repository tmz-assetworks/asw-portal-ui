
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

  @Output() readonly closeModal  = new EventEmitter<void>();

  /** Close modal on ESC key */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeModal.emit();
  }

  /** Handle backdrop mouse click */
  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (target.classList.contains('support-backdrop')) {
      event.preventDefault();
      this.closeModal.emit();
    }
  }

  
}
