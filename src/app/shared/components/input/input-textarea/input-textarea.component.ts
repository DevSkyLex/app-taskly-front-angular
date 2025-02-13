import { Component, computed, forwardRef, inject, Injector, input, InputSignal, model, ModelSignal, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl, ValidationErrors } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'app-input-textarea',
  standalone: false,
  templateUrl: './input-textarea.component.html',
  styleUrl: './input-textarea.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTextareaComponent),
    multi: true,
  }],
})
export class InputTextareaComponent implements OnInit, ControlValueAccessor {
  //#region Propriétés
  /**
   * Propriété value
   * @readonly
   * 
   * Valeur du champ de saisie
   * 
   * @access public
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<string>} value
   */
  public readonly value: ModelSignal<string> =
    model<string>('');

  /**
   * Propriété disabled
   * @readonly
   * 
   * Indique si le champ de saisie
   * est désactivé
   * 
   * @access public
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<boolean>} disabled
   */
  public readonly disabled: ModelSignal<boolean> =
    model<boolean>(false);

  /**
   * Propriété rows
   * @readonly
   * 
   * Nombre de lignes du champ de saisie
   * 
   * @access public
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<number>} rows
   */
  public readonly rows: ModelSignal<number> =
    model<number>(3);

  /**
   * Propriété cols
   * @readonly
   * 
   * Nombre de colonnes du champ de saisie
   * 
   * @access public
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<number>} cols
   */
  public readonly cols: ModelSignal<number> =
    model<number>(20);

  /**
   * Propriété readonly
   * @readonly
   * 
   * Indique si le champ de saisie
   * est en lecture seule
   * 
   * @access public
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<boolean>} readonly
   */
  public readonly readonly: ModelSignal<boolean> =
    model<boolean>(false);

  /**
   * Propriété required
   * @readonly
   * 
   * Indique si le champ de saisie
   * est obligatoire
   * 
   * @access public
   * @memberof InputTextareaComponent
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
   * Nom du champ de saisie
   * 
   * @access public
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string>} name
   */
  public readonly name: InputSignal<string> =
    input<string>('');

  /**
   * Propriété id
   * @readonly
   * 
   * Identifiant du champ de saisie
   * 
   * @access public
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string>} id
   */
  public readonly id: InputSignal<string> =
    input<string>(`input-${crypto.randomUUID()}`);

  /**
   * Propriété placeholder
   * @readonly
   * 
   * Placeholder du champ de saisie
   * 
   * @access public
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string>} placeholder
   */
  public readonly placeholder: InputSignal<string> =
    input<string>('');

  /**
   * Propriété onChange
   * 
   * Événement déclenché lors de la
   * modification de la valeur du champ
   * de saisie
   * 
   * @access public
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @type {(value: string) => void} onChange
   */
  public onChange: (value: string) => void = noop;

  /**
   * Propriété onTouched
   * 
   * Événement déclenché lors de la
   * modification de la valeur du champ
   * de saisie
   * 
   * @access public
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @type {() => void} onTouched
   */
  public onTouched: () => void = noop;

  /**
   * Propriété injector
   * @readonly
   * 
   * Injecteur de dépendances
   * 
   * @access private
   * @memberof InputTextareaComponent
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
   * Contrôle de formulaire Angular
   * 
   * @access private
   * @memberof InputTextareaComponent
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
   * Texte d'aide du champ de saisie
   * 
   * @access public
   * @memberof InputTextareaComponent
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
   * Contrôle de formulaire réactif
   * 
   * @access public
   * @memberof InputTextareaComponent
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
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @type {Signal<ValidationErrors | null>} errors
   */
  public readonly errors: Signal<ValidationErrors | null> = computed(() => {
    /**
     * Contrôle de formulaire
     * réactif
     * 
     * @see InputTextareaComponent#control
     */
    const control: FormControl | null = this.control();

    /**
     * Valeur du champ de saisie
     * 
     * @see InputTextareaComponent#value
     */
    const value: string = this.value();

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
   * @memberof InputTextareaComponent
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
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public ngOnInit(): void {
    /**
     * Configuration du contrôle de 
     * formulaire
     * 
     * @see InputTextareaComponent#setupControl
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
   * @memberof InputTextareaComponent
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
   * le champ de saisie
   * 
   * @access public
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @param {string} value - Valeur du champ de saisie
   * 
   * @returns {void} - Ne retourne rien
   */
  public writeValue(value: string): void {
    this.value.set(value);
  }

  /**
   * Méthode registerOnChange
   * 
   * Permet d'enregistrer une fonction
   * de rappel à appeler lors de la 
   * modification de la valeur du champ
   * de saisie
   * 
   * @access public
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @param {(value: string) => void} fn - Fonction de rappel
   * 
   * @returns {void} - Ne retourne rien
   */
  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Méthode registerOnTouched
   * 
   * Permet d'enregistrer une fonction
   * de rappel à appeler lors de la 
   * modification de la valeur du champ
   * de saisie
   * 
   * @access public
   * @memberof InputTextareaComponent
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
   * Permet de désactiver le champ de
   * saisie
   * 
   * @access public
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @param {boolean} disabled - Indique si le champ de saisie est désactivé
   * 
   * @returns {void} - Ne retourne rien
   */
  public setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  /**
   * Méthode onInput
   * 
   * Événement déclenché lors de la
   * modification de la valeur du champ
   * de saisie
   * 
   * @access public
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @param {Event} event - Événement
   * 
   * @returns {void} - Ne retourne rien
   */
  public onInput(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
  }

  /**
   * Méthode onBlur
   * 
   * Événement déclenché lors de la
   * perte du focus du champ de saisie
   * 
   * @access public
   * @memberof InputTextareaComponent
   * @since 1.0.0
   * 
   * @param {Event} event - Événement
   * 
   * @returns {void} - Ne retourne rien
   */
  public onBlur(event: Event): void {
    this.onTouched();
  }
  //#endregion
}
