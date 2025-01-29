import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-home',
  standalone: false,
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss'
})
export class MainHomeComponent {
  public readonly formBuilder: FormBuilder = 
    inject<FormBuilder>(FormBuilder);

  public readonly formGroup = this.formBuilder.group({
    phone: [null, [Validators.required]],
  });

  public ngOnInit(): void {
    // Désactiver le contrôle phone
    this.formGroup.controls.phone.enable();
  }
}
