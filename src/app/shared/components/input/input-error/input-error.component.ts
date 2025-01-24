import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-input-error',
  standalone: false,
  
  templateUrl: './input-error.component.html',
  styleUrl: './input-error.component.scss'
})
export class InputErrorComponent {
  @Input() errorMessage: string = '';
}