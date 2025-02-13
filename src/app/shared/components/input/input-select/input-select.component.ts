import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, computed, forwardRef, inject, Injector, input, InputSignal, model, ModelSignal, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl, ValidationErrors } from '@angular/forms';
import { AnimationTiming, AppAnimations } from '@app/shared/animations/app.animations';
import { noop } from 'rxjs';

export type InputSelectOption<T> = {
  value: T;
  label: string;
};

@Component({
  selector: 'app-input-select',
  standalone: false,
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputSelectComponent),
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
export class InputSelectComponent<T> implements OnInit, ControlValueAccessor {
  //#region Propriétés
  /**
   * Propriété value
   * @readonly
   * 
   * Valeur de la select
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<T[] | T>} value
   */
  public readonly value: ModelSignal<T[] | T> =
    model<T[] | T>([]);

  /**
   * Propriété searchable
   * 
   * Indique si la select
   * dispose d'une fonction de recherche
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<boolean>} searchable
   */
  public readonly searchable: 
    InputSignal<boolean> = input<boolean>(false);

  /**
   * Propriété multiple
   * @readonly
   * 
   * Indique si la select
   * accepte plusieurs options
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<boolean>} multiple
   */
  public readonly multiple: InputSignal<boolean> =
    input<boolean>(false);

  /**
   * Propriété max
   * @readonly
   * 
   * Nombre maximum d'options sélectionnables
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<number>} max
   */
  public readonly max: InputSignal<number> =
    input<number>(Infinity);

  /**
   * Propriété options
   * @readonly
   * 
   * Liste des options
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<InputSelectOption<T>[]>} options
   */
  public readonly options: ModelSignal<InputSelectOption<T>[]> =
    model<InputSelectOption<T>[]>([]);

  /**
   * Propriété disabled
   * @readonly
   * 
   * Indique si la select
   * est désactivé
   * 
   * @access public
   * @memberof InputSelectComponent
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
   * Indique si la select
   * est obligatoire
   * 
   * @access public
   * @memberof InputSelectComponent
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
   * Nom de la select
   * 
   * @access public
   * @memberof InputSelectComponent
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
   * Placeholder de la select
   * 
   * @access public
   * @memberof InputSelectComponent
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
   * Identifiant de la select
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string>} id
   */
  public readonly id: InputSignal<string> =
    input<string>(`input-${crypto.randomUUID()}`);

  /**
   * Propriété onChange
   * 
   * Évènement déclenché lors de la
   * sélection d'une option
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @type {(value: T | null) => void} onChange
   */
  public onChange: (value: T | null) => void = noop;

  /**
   * Propriété onTouched
   * 
   * Évènement déclenché lors de la
   * sortie de la select
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @type {() => void} onTouched
   */
  public onTouched: () => void = noop;

  /**
   * Propriété open
   * @readonly
   * 
   * État d'ouverture de la select
   * 
   * @access public
   * @memberof InputSelectComponent
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
   * @memberof InputSelectComponent
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
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<NgControl | null>} ngControl
   */
  private readonly ngControl: WritableSignal<NgControl | null> =
    signal<NgControl | null>(null);

  /**
   * Propriété help
   * @readonly
   * 
   * Texte d'aide du champ de sélection
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string | null>} help
   */
  public readonly help: InputSignal<string | null> = 
    input<string | null>(null);

  /**
   * Propriété control
   * @readonly
   * 
   * Contrôle de formulaire
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @type {Signal<FormControl | null>} control
   */
  public readonly control: Signal<FormControl | null> = computed(() => {
    const ngControl: NgControl | null = this.ngControl();
    return ngControl ? ngControl.control as FormControl : null;
  });

  /**
   * Propriété errors 
   * @readonly
   * 
   * Liste des erreurs de validation
   * du champ de saisie
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @type {Signal<ValidationErrors | null>} errors
   */
  public readonly errors: Signal<ValidationErrors | null> = computed(() => {
    /**
     * Contrôle de formulaire
     * réactif
     * 
     * @see InputSelectComponent#control
     */
    const control: FormControl | null = this.control();

    /**
     * Valeur du champ de saisie
     * 
     * @see InputSelectComponent#value
     */
    const value: T[] | T = this.value();

    /**
     * Erreurs de validation
     * du champ de saisie
     */
    return control ? control.errors : null;
  });

  /**
   * Propriété label
   * @readonly
   * 
   * Libellé du champ de saisie
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string | null>} label
   */
  public readonly label: InputSignal<string | null> =
    input<string | null>(null);
  
  /**
   * Propriété selectedOptions
   * @readonly
   * 
   * Liste des options sélectionnées
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @type {Signal<InputSelectOption<T>[]>} selectedOptions
   */
  public readonly selectedOptions: Signal<InputSelectOption<T>[]> = computed(() => {
    /**
     * Liste des options
     * 
     * @see InputSelectComponent#options
     */
    const options: InputSelectOption<T>[] = this.options();

    /**
     * Valeur de la select
     * 
     * @see InputSelectComponent#value
     */
    const value: T[] | T = this.value();

    return options.filter(option => {
      if (Array.isArray(value)) {
        return value.includes(option.value);
      } else {
        return value === option.value;
      }
    });
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
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public ngOnInit(): void {
    /**
     * Configuration du contrôle de 
     * formulaire
     * 
     * @see InputSelectComponent#setupControl
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
   * @memberof InputSelectComponent
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
   * la select
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @param {T | null} value - Valeur à écrire
   * 
   * @returns {void} - Ne retourne rien
   */
  public writeValue(value: T[]): void {
    this.value.set(value);
  }

  /**
   * Méthode registerOnChange
   * 
   * Permet d'enregistrer une fonction de
   * rappel lors de la sélection d'une option
   * 
   * @access public
   * @memberof InputSelectComponent
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
   * rappel lors de la sortie de la select
   * 
   * @access public
   * @memberof InputSelectComponent
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
   * Permet de désactiver la select
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @param {boolean} disabled - Indique si la select est désactivée
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
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @param {T} value - Valeur de l'option
   * 
   * @returns {void} - Ne retourne rien
   */
  public select(value: T): void {
    this.value.update((values: T[] | T) => {
      if (this.multiple()) {
        if (Array.isArray(values)) {
          if (values.includes(value)) {
            return values.filter(v => v !== value);
          } else {
            return [...values, value];
          }
        } else {
          return [values, value];
        }
      } else {
        return value;
      }
    });

    if (!this.multiple()) {
      this.hide();
    }

    this.onChange(value);
  }

  /**
   * Méthode isSelected
   * 
   * Permet de vérifier si une option
   * est sélectionnée
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @param {T} value - Valeur de l'option
   * 
   * @returns {boolean} - Retourne vrai si l'option est sélectionnée
   */
  public isSelected(value: T): boolean {
    if (this.multiple()) {
      return (this.value() as T[]).includes(value);
    } else {
      return this.value() === value;
    }
  }

  /**
   * Méthode toggle
   * 
   * Bascule l'état d'ouverture de 
   * la select
   * 
   * @access public
   * @memberof InputSelectComponent
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
   * Affiche le menu de la select
   * 
   * @access public
   * @memberof InputSelectComponent
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
   * Masque le menu de la select
   * 
   * @access public
   * @memberof InputSelectComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public hide(): void {
    this.open.set(false);
  }
  //#endregion
}
