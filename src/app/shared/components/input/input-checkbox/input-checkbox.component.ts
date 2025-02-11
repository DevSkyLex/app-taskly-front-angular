import { Component, computed, inject, Injector, input, InputSignal, model, ModelSignal, Signal, signal, WritableSignal } from '@angular/core';
import { FormControl, NgControl, ValidationErrors } from '@angular/forms';
import { Component, computed, forwardRef, inject, Injector, input, InputSignal, model, ModelSignal, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'app-input-checkbox',
  standalone: false,
  
  templateUrl: './input-checkbox.component.html',
  styleUrl: './input-checkbox.component.scss'
})
export class InputCheckboxComponent {
  //#region Propriétés
  /**
   * Propriété checked
   * @readonly
   * 
   * Indique si le champ checkbox est coché
   * 
   * @access public
   * @memberof InputCheckboxComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<boolean>} checked
   */
  public readonly checked: ModelSignal<boolean> =
    model<boolean>(false);

  /**
   * Propriété disabled
   * @readonly
   * 
   * Indique si le champ de saisie
   * est désactivé
   * 
   * @access public
   * @memberof InputCheckboxComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<boolean>} disabled
   */
  public readonly disabled: ModelSignal<boolean> =
    model<boolean>(false);

  /**
   * Propriété readonly
   * @readonly
   * 
   * Indique si le champ de saisie
   * est en lecture seule
   * 
   * @access public
   * @memberof InputCheckboxComponent
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
   * @memberof InputCheckboxComponent
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
   * @memberof InputCheckboxComponent
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
   * @memberof InputCheckboxComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string>} id
   */
  public readonly id: InputSignal<string> =
    input<string>(`input-${crypto.randomUUID()}`);

  /**
   * Propriété onChange
   * 
   * Événement déclenché lors de la
   * modification de la valeur du champ
   * de saisie
   * 
   * @access public
   * @memberof InputCheckboxComponent
   * @since 1.0.0
   * 
   * @type {(checked: boolean) => void} onChange
   */
  public onChange: (checked: boolean) => void = noop;

  /**
   * Propriété onTouched
   * 
   * Événement déclenché lors de la
   * modification de la valeur du champ
   * de saisie
   * 
   * @access public
   * @memberof InputCheckboxComponent
   * @since 1.0.0
   * 
  templateUrl: './input-checkbox.component.html',
  styleUrl: './input-checkbox.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputCheckboxComponent),
    multi: true,
  }],
})
export class InputCheckboxComponent implements OnInit, ControlValueAccessor {
  // #region Propriétés principales
  /**
   * Propriété value : valeur du champ de saisie
   * @readonly
   * @access public
   * @type {ModelSignal<string>} value
   */
  public readonly value: ModelSignal<boolean> = 
  model<boolean>(false);

  /**
   * Propriété disabled : champ de saisie désactivé
   * @readonly
   * @access public
   * @type {ModelSignal<boolean>} disabled
   */
  public readonly disabled: ModelSignal<boolean> = 
  model<boolean>(false);

  /**
   * Propriété required : champ de saisie obligatoire
   * @readonly
   * @access public
   * @type {ModelSignal<boolean>} required
   */
  public readonly required: ModelSignal<boolean> = 
  model<boolean>(false);

  /**
   * Propriété id : identifiant du champ de saisie
   * @readonly
   * @access public
   * @type {InputSignal<string>} id
   */
  public readonly id: InputSignal<string> =
  input<string>(`input-${crypto.randomUUID()}`);

  /**
   * Propriété label : libellé du champ de saisie
   * @readonly
   * @access public
   * @type {InputSignal<string>} label
   */
  public readonly label: InputSignal<string> =
  input<string>('');

  //#region Événements
  /**
   * Propriété onChange : événement déclenché lors de la modification de la valeur du champ de saisie
   * @access public
   * @type {(value: string) => void} onChange
   */
  public onChange: (value: boolean) => void = noop;

  /**
   * Propriété onTouched : événement déclenché lors de la perte de focus du champ de saisie
   * @access public
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
   * @memberof InputCheckboxComponent
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
   * @memberof InputCheckboxComponent
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
   * @memberof InputCheckboxComponent
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
   * @memberof InputCheckboxComponent
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
   * @memberof InputCheckboxComponent
   * @since 1.0.0
   * 
   * @type {Signal<ValidationErrors | null>} errors
   */
  public readonly errors: Signal<ValidationErrors | null> = computed(() => {
    /**
     * Contrôle de formulaire
     * réactif
     * 
     * @see InputCheckboxComponent#control
     */
    const control: FormControl | null = this.control();

    /**
     * Indique si le champ checkbox est coché
     * 
     * @see InputCheckboxComponent#checked
     */
    const checked: boolean = this.checked();

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
   * @memberof InputCheckboxComponent
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
   * @memberof InputCheckboxComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public ngOnInit(): void {
    /**
     * Configuration du contrôle de 
     * formulaire
     * 
     * @see InputCheckboxComponent#setupControl
     */
   * Propriété injector : injecteur de dépendances
   * @readonly
   * @access private
   * @type {Injector} injector
   */
  private readonly injector: Injector = inject<Injector>(Injector);

  /**
   * Propriété ngControl : contrôle de formulaire Angular
   * @readonly
   * @access private
   * @type {WritableSignal<NgControl | null>} ngControl
   */
  private readonly ngControl: WritableSignal<NgControl | null> = signal<NgControl | null>(null);

  /**
   * Propriété control : contrôle de formulaire réactif
   * @readonly
   * @access public
   * @type {Signal<FormControl | null>} control
   */
  public readonly control: Signal<FormControl | null> = computed(() => {
    const ngControl = this.ngControl();
    return ngControl ? (ngControl.control as FormControl) : null;
  });
  // #endregion

  // #region Méthodes
  /**
   * Méthode ngOnInit : Initialisation du composant
   * @access public
   * @return {void}
   */
  public ngOnInit(): void {
    this.setupControl();
  }

  /**
   * Méthode setupControl
   * 
   * Permet de configurer le contrôle de
   * formulaire réactif (si présent)
   * 
   * @access private
   * @memberof InputCheckboxComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  private setupControl(): void {
    const ngControl: NgControl | null = this.injector.get(NgControl, null);

    if (ngControl) {
      ngControl.valueAccessor = this;
    }

   * Méthode setupControl : Configuration du contrôle de formulaire
   * @access private
   * @return {void}
   */
  private setupControl(): void {
    const ngControl = this.injector.get(NgControl, null);
    if (ngControl) ngControl.valueAccessor = this;
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
   * @memberof InputCheckboxComponent
   * @since 1.0.0
   * 
   * @param {boolean} checked - Valeur du champ de saisie
   * 
   * @returns {void} - Ne retourne rien
   */
  public writeValue(checked: boolean): void {
    this.checked.set(checked);
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
   * @memberof InputCheckboxComponent
   * @since 1.0.0
   * 
   * @param {(checked: boolean) => void} fn - Fonction de rappel
   * 
   * @returns {void} - Ne retourne rien
   */
  public registerOnChange(fn: (checked: boolean) => void): void {
   * Méthode writeValue : Écriture de la valeur du champ de saisie
   * @access public
   * @param {boolean} value - Valeur du champ de saisie
   * @return {void}
   */
  public writeValue(value: boolean): void {
    this.value.set(value);
  }

  /**
   * Méthode registerOnChange : Enregistrement de la fonction de rappel lors de la modification de la valeur du champ de saisie
   * @access public
   * @param {(value: boolean) => void} fn - Fonction de rappel
   * @return {void}
   */
  public registerOnChange(fn: (value: boolean) => void): void {
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
   * @memberof InputCheckboxComponent
   * @since 1.0.0
   * 
   * @param {() => void} fn - Fonction de rappel
   * 
   * @returns {void} - Ne retourne rien
   * Méthode registerOnTouched : Enregistrement de la fonction de rappel lors de la perte de focus du champ de saisie
   * @access public
   * @param {() => void} fn - Fonction de rappel
   * @return {void}
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
   * @memberof InputCheckboxComponent
   * @since 1.0.0
   * 
   * @param {boolean} disabled - Indique si le champ de saisie est désactivé
   * 
   * @returns {void} - Ne retourne rien
   * Méthode setDisabledState : Définition de l'état du champ de saisie
   * @access public
   * @param {boolean} disabled - Champ de saisie désactivé
   * @return {void}
   */
  public setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  /**
   * Méthode toggle
   * 
   * Permet de basculer l'état du champ
   * case à cocher
   * 
   * @access public
   * @memberof InputCheckboxComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public toggle(): void {
    this.checked.update((checked: boolean) => !checked);
    this.onChange(this.checked());
  }

  /**
   * Méthode onBlur
   * 
   * Événement déclenché lors de la
   * perte du focus du champ de saisie
   * 
   * @access public
   * @memberof InputCheckboxComponent
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
   * Méthode onInput : Gestion de l'événement de saisie
   * @access public
   * @param {Event} event - Événement de saisie
   * @return {void}
   */
  public onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).checked;
    this.value.set(value);
    this.onChange(value);
  }

  /**
   * Méthode onBlur : Gestion de l'événement de perte de focus
   * @access public
   * @return {void}
   */
  public onBlur(): void {
    this.onTouched();
  }
}
