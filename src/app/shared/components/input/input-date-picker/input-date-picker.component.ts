import {
  Component,
  computed,
  forwardRef,
  inject,
  Injector,
  input,
  InputSignal,
  model,
  ModelSignal,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { CalendarMode, DateRange } from '@shared/components/calendar/calendar.component';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl, ValidationErrors } from '@angular/forms';
import { noop } from 'rxjs';
import { transition, trigger, useAnimation } from '@angular/animations';
import { AnimationTiming, AppAnimations } from '@shared/animations/app.animations';

type ValueType<M extends CalendarMode> = M extends 'single' 
  ? Date | null 
  : DateRange;

@Component({
  selector: 'app-input-date-picker',
  standalone: false,
  templateUrl: './input-date-picker.component.html',
  styleUrl: './input-date-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDatePickerComponent),
      multi: true,
    },
  ],
  animations: [
    trigger('popAnimation', [
      transition(':enter', [
        useAnimation(AppAnimations.popIn, {
          params: {
            timing: AnimationTiming.FAST,
            origin: 'top',
          },
        }),
      ]),
      transition(':leave', [
        useAnimation(AppAnimations.popOut, {
          params: {
            timing: AnimationTiming.FAST,
            origin: 'top',
          },
        }),
      ]),
    ]),
  ],
})
export class InputDatePickerComponent<M extends CalendarMode = 'single'> implements OnInit, ControlValueAccessor {
  //#region Propriétés
  /**
   * Propriété value
   * @readonly
   *
   * Valeur du sélecteur de date / plage de date
   *
   * @access public
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   *
   * @type {ModelSignal<Date | null | DateRange>} value
   */
  public readonly value: ModelSignal<ValueType<M>> = model<ValueType<M>>(
    null as ValueType<M>
  );

    /**
   * Propriété min
   * @readonly
   *
   * Date minimale autorisée
   *
   * @access public
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   *
   * @type {InputSignal<Date | null>} min
   */
    public readonly min: InputSignal<Date | null> = 
    input<Date | null>(null);

  /**
   * Propriété max
   * @readonly
   *
   * Date maximale autorisée
   *
   * @access public
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   *
   * @type {InputSignal<Date>} max
   */
  public readonly max: InputSignal<Date | null> = 
    input<Date | null>(null);

  /**
   * Propriété disabled
   * @readonly
   *
   * Indique si la select
   * est désactivé
   *
   * @access public
   * @memberof InputDatePickerComponent
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
   * @memberof InputDatePickerComponent
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
   * Nom du sélecteur de date / plage de date
   *
   * @access public
   * @memberof InputDatePickerComponent
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
   * Placeholder du sélecteur de date / plage de date
   *
   * @access public
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   *
   * @type {InputSignal<string | null>} placeholder
   */
  public readonly placeholder: InputSignal<string | null> = 
    input<string | null>(null);

  /**
   * Propriété id
   * @readonly
   *
   * Identifiant du sélecteur de date / plage de date
   *
   * @access public
   * @memberof InputDatePickerComponent
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
   * sélection d'une date ou d'une plage
   *
   * @access public
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   *
   * @type {(value: ValueType<M>) => void} onChange
   */
  public onChange: (value: ValueType<M>) => void = noop;

  /**
   * Propriété onTouched
   *
   * Évènement déclenché lors de la
   * sortie du sélecteur de date / plage de date
   *
   * @access public
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   *
   * @type {() => void} onTouched
   */
  public onTouched: () => void = noop;

  /**
   * Propriété open
   * @readonly
   *
   * État d'ouverture du sélecteur de date / plage de date
   *
   * @access public
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   *
   * @type {WritableSignal<boolean>} open
   */
  public readonly open: WritableSignal<boolean> = signal<boolean>(false);

  /**
   * Propriété injector
   * @readonly
   *
   * Injecteur de dépendances
   *
   * @access private
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   *
   * @type {Injector} injector
   */
  private readonly injector: Injector = inject<Injector>(Injector);

  /**
   * Propriété ngControl
   * @readonly
   *
   * Contrôle de formulaire
   * Angular
   *
   * @access private
   * @memberof InputDatePickerComponent
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
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   *
   * @type {InputSignal<string | null>} help
   */
  public readonly help: InputSignal<string | null> = 
    input<string | null>(null);

  /**
   * Propriété mode
   * @readonly
   * 
   * Mode du sélecteur de date / plage de date
   * 
   * @access public
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<CalendarMode>} mode
   */
  public readonly mode: InputSignal<M> = 
    input<M>('single' as M);

  /**
   * Propriété control
   * @readonly
   *
   * Contrôle de formulaire
   *
   * @access public
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   *
   * @type {Signal<FormControl | null>} control
   */
  public readonly control: Signal<FormControl | null> = computed(() => {
    const ngControl: NgControl | null = this.ngControl();
    return ngControl ? (ngControl.control as FormControl) : null;
  });

  public readonly singleDate: Signal<Date | null> = computed(() => {
    return this.value() as Date | null;
  });

  public readonly rangeDate: Signal<DateRange> = computed(() => {
    return this.value() as DateRange;
  });

  /**
   * Propriété errors
   * @readonly
   *
   * Liste des erreurs de validation
   * du champ de saisie
   *
   * @access public
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   *
   * @type {Signal<ValidationErrors | null>} errors
   */
  public readonly errors: Signal<ValidationErrors | null> = computed(() => {
    /**
     * Contrôle de formulaire
     * réactif
     *
     * @see InputDatePickerComponent#control
     */
    const control: FormControl | null = this.control();

    /**
     * Valeur du champ de saisie
     *
     * @see InputDatePickerComponent#value
     */
    const value: Date | null | DateRange = this.value();

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
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   *
   * @type {InputSignal<string | null>} label
   */
  public readonly label: InputSignal<string | null> = 
    input<string | null>(null);
  //#endregion

  //#region Méthodes
  /**
   * Méthode ngOnInit
   *
   * Méthode du cycle de vie du composant
   * appelée après la construction du composant
   *
   * @access public
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   *
   * @returns {void} - Ne retourne rien
   */
  public ngOnInit(): void {
    /**
     * Configuration du contrôle de
     * formulaire
     *
     * @see InputDatePickerComponent#setupControl
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
   * @memberof InputDatePickerComponent
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
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   *
   * @param {Date | null | DateRange | null} value - Valeur à écrire
   *
   * @returns {void} - Ne retourne rien
   */
  public writeValue(value: ValueType<M>): void {
    this.value.set(value);
  }

  /**
   * Méthode registerOnChange
   *
   * Permet d'enregistrer une fonction de
   * rappel lors de la sélection d'une option
   *
   * @access public
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   *
   * @param {(value: ValueType<M>) => void} fn - Fonction de rappel
   *
   * @returns {void} - Ne retourne rien
   */
  public registerOnChange(fn: (value: ValueType<M>) => void): void {
    this.onChange = fn;
  }

  /**
   * Méthode registerOnTouched
   *
   * Permet d'enregistrer une fonction de
   * rappel lors de la sortie du sélecteur de date / plage de date
   *
   * @access public
   * @memberof InputDatePickerComponent
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
   * @memberof InputDatePickerComponent
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
   * Méthode toggle
   *
   * Bascule l'état d'ouverture de
   * la select
   *
   * @access public
   * @memberof InputDatePickerComponent
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
   * Affiche le menu du sélecteur de date / plage de date
   *
   * @access public
   * @memberof InputDatePickerComponent
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
   * Masque le menu du sélecteur de date / plage de date
   *
   * @access public
   * @memberof InputDatePickerComponent
   * @since 1.0.0
   *
   * @returns {void} - Ne retourne rien
   */
  public hide(): void {
    this.open.set(false);
  }
  //#endregion
}
