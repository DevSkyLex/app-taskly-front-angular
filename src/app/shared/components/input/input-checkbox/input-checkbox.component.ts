import { Component, computed, ElementRef, inject, Injector, input, InputSignal, model, ModelSignal, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { FormControl, NgControl, ValidationErrors } from '@angular/forms';
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
   * @returns {void} - Ne retourne rien
   */
  public onBlur(): void {
    this.onTouched();
  }
  //#endregion
}
