import { AfterViewInit, Component, ElementRef, inject, input, InputSignal } from '@angular/core';
import { ResizablePanelGroupComponent, ResizablePanelGroupDirection } from '../resizable-panel-group/resizable-panel-group.component';

@Component({
  selector: 'app-resizable-panel',
  standalone: false,
  templateUrl: './resizable-panel.component.html',
  styleUrl: './resizable-panel.component.scss'
})
export class ResizablePanelComponent {}
