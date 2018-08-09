import { Directive, HostListener, ElementRef, Renderer2 } from "@angular/core";

@Directive({
    selector: '[categoryDropdown]'
})

export class DropdownDirective {
    manageDropdown : boolean = false;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {

    }

    @HostListener('click') openDropdown(eventData: Event) {
        if(!this.manageDropdown) {
          this.renderer.addClass(this.elementRef.nativeElement,'open');
          this.manageDropdown = !this.manageDropdown;
        } else {
          this.renderer.removeClass(this.elementRef.nativeElement, 'open');
          this.manageDropdown = !this.manageDropdown;
        }
      }
    }