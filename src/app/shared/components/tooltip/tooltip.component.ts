import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, input, InputSignal, model, ModelSignal, TemplateRef } from '@angular/core';
import { AnimationTiming, AppAnimations } from '@app/shared/animations/app.animations';

@Component({
  selector: 'app-tooltip',
  standalone: false,
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  animations: [
    trigger('appearAnimation', [
      transition(':enter', [
        useAnimation(AppAnimations.popIn, {
          params: { timing: AnimationTiming.NORMAL }
        })
      ]),
      transition(':leave', [
        useAnimation(AppAnimations.popOut, {
          params: { timing: AnimationTiming.NORMAL }
        })
      ]),
    ]),
  ]
})
export class TooltipComponent {
  //#region Propriétés
  /**
   * Propriété content
   * @readonly
   * 
   * Contenu du tooltip
   * 
   * @access public
   * @memberof TooltipComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<string | TemplateRef<any>>} content
   */
  public readonly content: ModelSignal<string | TemplateRef<any> | null> = 
    model<string | TemplateRef<any> | null>(null);
  //#endregion

  //#region Méthodes
  /**
   * Méthode isTemplate
   * 
   * Vérifie si le contenu est un template
   * 
   * @access public
   * @memberof TooltipComponent
   * @since 1.0.0
   * 
   * @param {string | TemplateRef<any> | null} content - Contenu
   * 
   * @returns {content is TemplateRef<any>} - Résultat de la vérification
   */
  public isTemplate(content: string | TemplateRef<any> | null): content is TemplateRef<any> {
    return content instanceof TemplateRef;
  }
  //#endregion
}
