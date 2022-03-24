import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColorRed]'
})
export class ColorRedDirective {

  constructor(private element: ElementRef) {
    element.nativeElement.style.color = '#e35e6b'
   }

}
