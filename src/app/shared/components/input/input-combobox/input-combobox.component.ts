import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, computed, forwardRef, inject, Injector, input, InputSignal, model, ModelSignal, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { AnimationTiming, AppAnimations } from '@app/shared/animations/app.animations';
import { noop } from 'rxjs';

export type InputComboxOption<T> = {
  value: T;
  label: string;
};

@Component({
  selector: 'app-input-combobox',
  standalone: false,
  templateUrl: './input-combobox.component.html',
  styleUrl: './input-combobox.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComboboxComponent),
    multi: true,
  }],
  animations: [
    trigger('popAnimation', [
      transition(':enter', [
        useAnimation(AppAnimations.popIn, {
          params: { 
            timing: AnimationTiming.FAST,
            origin: 'top' 
          },
        }),
      ]),
      transition(':leave', [
        useAnimation(AppAnimations.popOut, {
          params: { 
            timing: AnimationTiming.FAST,
            origin: 'top'
          },
        }),
      ]),
    ]),
  ],
})
export class InputComboboxComponent<T> implements OnInit, ControlValueAccessor {
  //#region Propriétés
  /**
   * Propriété value
   * @readonly
   * 
   * Valeur de la combobox
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<T | null>} value
   */
  public readonly value: ModelSignal<T | null> =
    model<T | null>(null);

  /**
   * Propriété options
   * @readonly
   * 
   * Liste des options
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<InputComboxOption<T>[]>} options
   */
  public readonly options: ModelSignal<InputComboxOption<T>[]> =
    model<InputComboxOption<T>[]>([]);

  /**
   * Propriété disabled
   * @readonly
   * 
   * Indique si la combobox
   * est désactivé
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<boolean>} disabled
   */
  public readonly disabled: ModelSignal<boolean> =
    model<boolean>(false);

  /**
   * Propriété required
   * @readonly
   * 
   * Indique si la combobox
   * est obligatoire
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<boolean>} required
   */
  public readonly required: ModelSignal<boolean> =
    model<boolean>(false);

  /**
   * Propriété name
   * @readonly
   * 
   * Nom de la combobox
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string>} name
   */
  public readonly name: InputSignal<string> =
    input<string>('');

  /**
   * Propriété placeholder
   * @readonly
   * 
   * Placeholder de la combobox
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string>} placeholder
   */
  public readonly placeholder: InputSignal<string> =
    input<string>('Sélectionner une option');

  /**
   * Propriété id
   * @readonly
   * 
   * Identifiant de la combobox
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string>} id
   */
  public readonly id: InputSignal<string> =
    input<string>('');

  /**
   * Propriété onChange
   * 
   * Évènement déclenché lors de la
   * sélection d'une option
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @type {(value: T | null) => void} onChange
   */
  public onChange: (value: T | null) => void = noop;

  /**
   * Propriété onTouched
   * 
   * Évènement déclenché lors de la
   * sortie de la combobox
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @type {() => void} onTouched
   */
  public onTouched: () => void = noop;

  /**
   * Propriété open
   * @readonly
   * 
   * État d'ouverture de la combobox
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<boolean>} open
   */
  public readonly open: WritableSignal<boolean> = 
    signal<boolean>(false);

  /**
   * Propriété injector
   * @readonly
   * 
   * Injecteur de dépendances
   * 
   * @access private
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @type {Injector} injector
   */
  private readonly injector: Injector = 
    inject<Injector>(Injector);

  /**
   * Propriété ngControl
   * @readonly
   * 
   * Contrôle de formulaire
   * Angular
   * 
   * @access private
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<NgControl | null>} ngControl
   */
  private readonly ngControl: WritableSignal<NgControl | null> =
    signal<NgControl | null>(null);

  /**
   * Propriété control
   * @readonly
   * 
   * Contrôle de formulaire
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @type {Signal<FormControl | null>} control
   */
  public readonly control: Signal<FormControl | null> = computed(() => {
    const ngControl: NgControl | null = this.ngControl();
    return ngControl ? ngControl.control as FormControl : null;
  });

  /**
   * Propriété selectedOption
   * @readonly
   * 
   * Option sélectionnée
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @type {Signal<InputComboxOption<T> | null>} selectedOption
   */
  public readonly selectedOption: Signal<InputComboxOption<T> | null> = computed(() => {
    return this.options().find(option => option.value === this.value()) || null;
  });
  //#endregion

  //#region Méthodes
  /**
   * Méthode ngOnInit
   * 
   * Méthode du cycle de vie du composant
   * appelée après la construction du composant
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public ngOnInit(): void {
    /**
     * Configuration du contrôle de 
     * formulaire
     * 
     * @see InputComboboxComponent#setupControl
     */
    this.setupControl();
  }

    /**
   * Méthode setupControl
   * 
   * Permet de configurer le contrôle de
   * formulaire réactif (si présent)
   * 
   * @access private
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  private setupControl(): void {
    const ngControl: NgControl | null = this.injector.get(NgControl, null);

    if (ngControl) {
      ngControl.valueAccessor = this;
    }

    this.ngControl.set(ngControl);
  }

  /**
   * Méthode writeValue
   * 
   * Permet aux contrôles de formulaire
   * réactifs d'écrire une valeur dans
   * la combobox
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @param {T | null} value - Valeur à écrire
   * 
   * @returns {void} - Ne retourne rien
   */
  public writeValue(value: T | null): void {
    this.value.set(value);
  }

  /**
   * Méthode registerOnChange
   * 
   * Permet d'enregistrer une fonction de
   * rappel lors de la sélection d'une option
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @param {(value: T | null) => void} fn - Fonction de rappel
   * 
   * @returns {void} - Ne retourne rien
   */
  public registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  /**
   * Méthode registerOnTouched
   * 
   * Permet d'enregistrer une fonction de
   * rappel lors de la sortie de la combobox
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @param {() => void} fn - Fonction de rappel
   * 
   * @returns {void} - Ne retourne rien
   */
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Méthode setDisabledState
   * 
   * Permet de désactiver la combobox
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @param {boolean} disabled - Indique si la combobox est désactivée
   * 
   * @returns {void} - Ne retourne rien
   */
  public setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  /**
   * Méthode select
   * 
   * Permet de sélectionner une 
   * option
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @param {T} value - Valeur de l'option
   * 
   * @returns {void} - Ne retourne rien
   */
  public select(value: T): void {
    this.value.set(value);
    this.onChange(value);
  }

  /**
   * Méthode isSelected
   * 
   * Permet de vérifier si une option
   * est sélectionnée
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @param {T} value - Valeur de l'option
   * 
   * @returns {boolean} - Retourne vrai si l'option est sélectionnée
   */
  public isSelected(value: T): boolean {
    return this.value() === value;
  }

  /**
   * Méthode toggle
   * 
   * Bascule l'état d'ouverture de 
   * la combobox
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public toggle(): void {
    this.open.update((value: boolean) => !value);
  }

  /**
   * Méthode show
   * 
   * Affiche le menu de la combobox
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public show(): void {
    this.open.set(true);
  }

  /**
   * Méthode hide
   * 
   * Masque le menu de la combobox
   * 
   * @access public
   * @memberof InputComboboxComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public hide(): void {
    this.open.set(false);
  }
  //#endregion
}
