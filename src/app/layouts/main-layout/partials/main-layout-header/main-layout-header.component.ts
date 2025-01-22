import { OverlayModule } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-main-layout-header',
  imports: [SharedModule, OverlayModule],
  templateUrl: './main-layout-header.component.html',
  styleUrl: './main-layout-header.component.scss',
})
export class MainLayoutHeaderComponent {
}
