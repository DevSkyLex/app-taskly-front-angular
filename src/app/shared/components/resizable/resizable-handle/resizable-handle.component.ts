import { Component, computed, ElementRef, HostListener, inject, input, InputSignal, Renderer2, Signal, signal, WritableSignal } from '@angular/core';
import { ResizablePanelGroupComponent, ResizablePanelGroupDirection } from '../resizable-panel-group/resizable-panel-group.component';

@Component({
  selector: 'app-resizable-handle',
  standalone: false,
  
  templateUrl: './resizable-handle.component.html',
  styleUrl: './resizable-handle.component.scss'
})
export class ResizableHandleComponent {
  //#region Propriétés
  /**
   * Propriété handle
   * @readonly
   * 
   * Permet d'afficjer l'indicatif 
   * de la poignée
   * 
   * @access public
   * @memberof ResizableHandleComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<boolean>} handle
   */
  public readonly handle: InputSignal<boolean> = 
    input<boolean>(false);

  /**
   * Propriété dragging
   * @readonly
   * 
   * Permet d'afficher l'indicateur de
   * déplacement
   * 
   * @access private
   * @memberof ResizableHandleComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<boolean>} dragging
   */
  private readonly dragging: WritableSignal<boolean> =
    signal<boolean>(false);

  /**
   * Propriété elementRef
   * @readonly
   * 
   * Permet d'afficher la référence de l'élément
   * 
   * @access private
   * @memberof ResizableHandleComponent
   * @since 1.0.0
   * 
   * @type {ElementRef} elementRef
   */
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);

  /**
   * Propriété renderer
   * @readonly
   * 
   * Permet d'afficher le rendu
   * 
   * @access private
   * @memberof ResizableHandleComponent
   * @since 1.0.0
   * 
   * @type {Renderer2} renderer
   */
  private readonly renderer: Renderer2 =
    inject<Renderer2>(Renderer2);

  /**
   * Propriété startX
   * @readonly
   * 
   * Permet d'afficher la position
   * de départ en X
   * 
   * @access private
   * @memberof ResizableHandleComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<number>} startX
   */
  private readonly startX: WritableSignal<number> = 
    signal<number>(0);

  /**
   * Propriété startY
   * @readonly
   * 
   * Permet d'afficher la position
   * de départ en Y
   * 
   * @access private
   * @memberof ResizableHandleComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<number>} startY
   */
  private readonly startY: WritableSignal<number> =
    signal<number>(0);

  /**
   * Propriété startSize
   * @readonly
   * 
   * Permet d'afficher la taille de départ
   * 
   * @access private
   * @memberof ResizableHandleComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<number>} startSize
   */
  private readonly startSize: WritableSignal<number> =
    signal<number>(0);

  /**
   * Propriété targetPanel
   * @readonly
   * 
   * Permet d'afficher le panneau cible
   * 
   * @access private
   * @memberof ResizableHandleComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<HTMLElement | null>} targetPanel
   */
  private readonly targetPanel: WritableSignal<HTMLElement | null> =
    signal<HTMLElement | null>(null);

  /**
   * Propriété resizablePanelGroup
   * @readonly
   * 
   * Permet d'afficher le groupe de panneaux
   * redimensionnables
   * 
   * @access private
   * @memberof ResizableHandleComponent
   * @since 1.0.0
   * 
   * @type {ResizablePanelGroupComponent} resizablePanelGroup
   */
  private readonly resizablePanelGroup: ResizablePanelGroupComponent =
    inject<ResizablePanelGroupComponent>(ResizablePanelGroupComponent);

  /**
   * Propriété direction
   * @readonly
   * 
   * Permet de récupérer la direction
   * du groupe de panneaux redimensionnables
   * 
   * @access private
   * @memberof ResizableHandleComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<ResizablePanelGroupDirection>} direction
   */
  private readonly direction: InputSignal<ResizablePanelGroupDirection> =
    this.resizablePanelGroup.direction;

  /**
   * Propriété classes
   * @readonly
   * 
   * Permet d'afficher les classes
   * de la poignée
   * 
   * @access public
   * @memberof ResizableHandleComponent
   * @since 1.0.0
   * 
   * @type {Signal<string[]>} classes
   */
  public readonly classes: Signal<string[]> = computed(() => {
    return [
      'resizable-handle',
      'resizable-handle--' + this.direction()
    ];
  });
  //#endregion

  //#region Méthodes
  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: MouseEvent): void {
    event.preventDefault();

    this.dragging.set(true);

    this.startX.set(event.clientX);

    this.startY.set(event.clientY);

    const handleElement: HTMLElement = this.elementRef.nativeElement;

    this.targetPanel.set(handleElement.previousElementSibling as HTMLElement);

    if (this.direction() === 'horizontal') {
      this.startSize.set(this.targetPanel()?.getBoundingClientRect().width || 0);
    }
    else {
      this.startSize.set(this.targetPanel()?.getBoundingClientRect().height || 0);
    }

    this.renderer.addClass(document.body, 'no-select');
  }

  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(event: MouseEvent): void {
    if (!this.dragging()) {
      return;
    }

    if (this.direction() === 'horizontal') {
      const dx: number = event.clientX - this.startX();
      const newSize: number = this.startSize() + dx;
      this.renderer.setStyle(this.targetPanel(), 'width', `${newSize}px`);
    }
    else {
      const dy: number = event.clientY - this.startY();
      const newSize: number = this.startSize() + dy;
      this.renderer.setStyle(this.targetPanel(), 'height', `${newSize}px`);
    }
  }

  @HostListener('document:mouseup', ['$event'])
  public onMouseUp(): void {
    if (this.dragging()) {
      this.dragging.set(false);
      this.renderer.removeClass(document.body, 'no-select');
    }
  }
  //#endregion
}
