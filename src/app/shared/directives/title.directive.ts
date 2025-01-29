import { Directive } from '@angular/core';

@Directive({
  selector: 'h1[appTitle], h2[appTitle], h3[appTitle], h4[appTitle], h5[appTitle], h6[appTitle]',
  standalone: false,
  host: { class: 'title' }
})
export class TitleDirective {}
