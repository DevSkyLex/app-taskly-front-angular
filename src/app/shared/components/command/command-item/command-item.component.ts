import { Component, computed, ElementRef, inject, Signal, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { CommandComponent } from '../command.component';

@Component({
  selector: 'app-command-item',
  standalone: false,
  
  templateUrl: './command-item.component.html',
  styleUrl: './command-item.component.scss'
})
export class CommandItemComponent {
  //#region Propriétés
  /**
   * Propriété elementRef
   * @readonly
   * 
   * Récupère l'élément natif du composant
   * 
   * @access private
   * @memberof CommandItemComponent
   * @since 1.0.0
   * 
   * @type {Signal<ElementRef<HTMLDivElement>>} elementRef
   */
  private readonly elementRef: Signal<ElementRef<HTMLDivElement> | undefined> = 
    viewChild<ElementRef<HTMLDivElement>>('content');

  /**
   * Propriété text
   * @readonly
   * 
   * Récupère le contenu textuel 
   * de l'élément
   * 
   * @access private
   * @memberof CommandItemComponent
   * @since 1.0.0
   * 
   * @type {Signal<string>} text
   */
  private readonly text: Signal<string> = computed(() => {
    const elementRef: ElementRef<HTMLDivElement> | undefined = this.elementRef();
    return elementRef?.nativeElement.textContent || '';
  });

  /**
   * Propriété command
   * @readonly
   * 
   * Récupère l'élément parent de type
   * CommandComponent
   * 
   * @access private
   * @memberof CommandItemComponent
   * @since 1.0.0
   * 
   * @type {CommandComponent} command
   */
  private readonly command: CommandComponent = 
    inject<CommandComponent>(CommandComponent);

  /**
   * Propriété template
   * @readonly
   * 
   * Récupère le template de l'élément
   *  
   * @access private
   * @memberof CommandItemComponent
   * @since 1.0.0
   * 
   * @type {Signal<TemplateRef<any>>} template
   */
  private readonly template: Signal<TemplateRef<any>> = 
    viewChild.required<TemplateRef<any>>(TemplateRef);

  /**
   * Propriété viewContainerRef
   * @readonly
   * 
   * Récupère le conteneur de vue
   * 
   * @access private
   * @memberof CommandItemComponent
   * @since 1.0.0
   * 
   * @type {ViewContainerRef} viewContainerRef
   */
  private readonly viewContainerRef: ViewContainerRef = 
    inject<ViewContainerRef>(ViewContainerRef);

  /**
   * Propriété match
   * @readonly
   * 
   * Indique si le texte de l'élément
   * 
   * @access public
   * @memberof CommandItemComponent
   * @since 1.0.0
   * 
   * @type {Signal<boolean>} match
   */
  public readonly match: Signal<boolean> = computed(() => {
    const text: string = this.text().toLocaleLowerCase();
    const search: string = this.command.search()?.value().toLocaleLowerCase() || '';

    return text.includes(search);
  });
  //#endregion
}
