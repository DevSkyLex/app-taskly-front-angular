import { Component, computed, inject, Injector, input, InputSignal, model, ModelSignal, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'app-input-time',
  standalone: false,
  templateUrl: './input-time.component.html',
  styleUrl: './input-time.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, 
    useExisting: InputTimeComponent, 
    multi: true }],
})
export class InputTimeComponent implements OnInit, ControlValueAccessor {
  // #region Propriétés principales
  /**
   * Propriété value : valeur du champ de saisie
   * @readonly
   * @access public
   * @type {ModelSignal<string>} value
   */
  public readonly value: ModelSignal<string> = 
  model<string>('');

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


  //#region Événements
  /**
   * Propriété onChange : événement déclenché lors de la modification de la valeur du champ de saisie
   * @access public
   * @type {(value: string) => void} onChange
   */
  public onChange: (value: string) => void = noop;

  /**
   * Propriété onTouched : événement déclenché lors de la perte de focus du champ de saisie
   * @access public
   * @type {() => void} onTouched
   */
  public onTouched: () => void = noop;

  /**
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
   * Méthode writeValue : Écriture de la valeur du champ de saisie
   * @access public
   * @param {string} value - Valeur du champ de saisie
   * @return {void}
   */
  public writeValue(value: string): void {
    this.value.set(value);
  }

  /**
   * Méthode registerOnChange : Enregistrement de la fonction de rappel lors de la modification de la valeur du champ de saisie
   * @access public
   * @param {(value: string) => void} fn - Fonction de rappel
   * @return {void}
   */
  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Méthode registerOnTouched : Enregistrement de la fonction de rappel lors de la perte de focus du champ de saisie
   * @access public
   * @param {() => void} fn - Fonction de rappel
   * @return {void}
   */
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Méthode setDisabledState : Définition de l'état du champ de saisie
   * @access public
   * @param {boolean} disabled - Champ de saisie désactivé
   * @return {void}
   */
  public setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  /**
   * Méthode onInput : Gestion de l'événement de saisie
   * @access public
   * @param {Event} event - Événement de saisie
   * @return {void}
   */
  public onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
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
