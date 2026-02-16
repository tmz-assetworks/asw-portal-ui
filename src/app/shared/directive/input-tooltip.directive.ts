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
  private tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.tooltipEl || !this.tooltipText) {
      return;
    }

    const rect = this.el.nativeElement.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (rect.top < 80) {
      this.tooltipPosition = 'bottom';
    } else if (rect.bottom > vh - 80) {
      this.tooltipPosition = 'top';
    } else if (rect.left < 120) {
      this.tooltipPosition = 'right';
    } else if (rect.right > vw - 120) {
      this.tooltipPosition = 'left';
    } else {
      this.tooltipPosition = 'top';
    }

    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipEl, 'tooltip');
    this.renderer.addClass(this.tooltipEl, this.tooltipPosition);
    this.tooltipEl.textContent = this.tooltipText;

    // IMPORTANT: same positioning context as old component
    const parent = this.el.nativeElement.parentElement!;
    this.renderer.setStyle(parent, 'position', 'relative');
    this.renderer.appendChild(parent, this.tooltipEl);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.tooltipEl) {
      this.renderer.removeChild(
        this.tooltipEl.parentNode,
        this.tooltipEl
      );
      this.tooltipEl = undefined;
    }
  }
}
