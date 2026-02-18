import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appInputTooltip]',
  standalone: true
})
export class InputTooltipDirective {

  @Input('appInputTooltip') tooltipText = '';

  private tooltipEl?: HTMLElement;
  private arrowEl?: HTMLElement;
  private position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  @HostListener('focus')
  show(): void {
    if (this.tooltipEl || !this.tooltipText) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Auto position detection
    if (rect.top < 80) {
      this.position = 'bottom';
    } else if (rect.bottom > vh - 80) {
      this.position = 'top';
    } else if (rect.left < 120) {
      this.position = 'right';
    } else if (rect.right > vw - 120) {
      this.position = 'left';
    } else {
      this.position = 'top';
    }

    // Create tooltip
    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipEl, 'custom-tooltip');
    this.renderer.addClass(this.tooltipEl, this.position);
    this.tooltipEl.textContent = this.tooltipText;

    // Create arrow
    this.arrowEl = this.renderer.createElement('span');
    this.renderer.addClass(this.arrowEl, 'tooltip-arrow');
    this.renderer.appendChild(this.tooltipEl, this.arrowEl);

    this.renderer.appendChild(document.body, this.tooltipEl);

    this.setPosition(rect);
  }

  private setPosition(rect: DOMRect) {
    if (!this.tooltipEl) return;

    const tooltipRect = this.tooltipEl.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (this.position) {
      case 'top':
        top = rect.top - tooltipRect.height - 8;
        left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        break;

      case 'bottom':
        top = rect.bottom + 8;
        left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        break;

      case 'left':
        top = rect.top + rect.height / 2 - tooltipRect.height / 2;
        left = rect.left - tooltipRect.width - 8;
        break;

      case 'right':
        top = rect.top + rect.height / 2 - tooltipRect.height / 2;
        left = rect.right + 8;
        break;
    }

    this.renderer.setStyle(this.tooltipEl, 'position', 'fixed');
    this.renderer.setStyle(this.tooltipEl, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${left}px`);
    this.renderer.setStyle(this.tooltipEl, 'z-index', '9999');
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  hide(): void {
    if (this.tooltipEl) {
      this.renderer.removeChild(document.body, this.tooltipEl);
      this.tooltipEl = undefined;
      this.arrowEl = undefined;
    }
  }
}
