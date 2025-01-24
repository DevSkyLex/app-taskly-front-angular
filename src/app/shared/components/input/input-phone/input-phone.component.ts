import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, computed, forwardRef, inject, Injector, input, InputSignal, model, ModelSignal, signal, Signal, WritableSignal } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { AnimationTiming, AppAnimations } from '@app/shared/animations/app.animations';
import { noop } from 'rxjs';

export type InputPhoneFormat = {
  countryCode: string;
  countryName: string;
  dialCode: string;
  example: string;
  regex: RegExp;
  mask?: string;
}

@Component({
  selector: 'app-input-phone',
  standalone: false,
  templateUrl: './input-phone.component.html',
  styleUrl: './input-phone.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputPhoneComponent),
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
export class InputPhoneComponent {
  //#region Propriétés
  /**
   * Propriétés formats
   * @readonly
   * 
   * Les formats de numéro de téléphone 
   * disponibles.
   * 
   * @access public
   * @memberof InputPhoneComponent
   * @since 1.0.0
   * 
   * @type {Signal<InputPhoneFormat[]>} formats
   */
  public readonly formats: Signal<InputPhoneFormat[]> = signal<InputPhoneFormat[]>([
    {
      countryCode: 'US',
      countryName: 'United States',
      dialCode: '+1',
      example: '(201) 555-0123',
      regex: /^\(\d{3}\) \d{3}-\d{4}$/,
      mask: '(000) 000-0000'
    },
    {
      countryCode: 'FR',
      countryName: 'France',
      dialCode: '+33',
      example: '06 12 34 56 78',
      regex: /^(\d{2}) \d{2} \d{2} \d{2} \d{2}$/,
      mask: '00 00 00 00 00'
    },
    {
      countryCode: 'GB',
      countryName: 'United Kingdom',
      dialCode: '+44',
      example: '07123 456789',
      regex: /^(\d{5}) \d{6}$/,
      mask: '00000 000000'
    },
    {
      countryCode: 'DE',
      countryName: 'Germany',
      dialCode: '+49',
      example: '030 12345678',
      regex: /^(\d{3}) \d{8}$/,
      mask: '000 00000000'
    },
    {
      countryCode: 'IN',
      countryName: 'India',
      dialCode: '+91',
      example: '091234 56789',
      regex: /^(\d{5}) \d{5}$/,
      mask: '00000 00000'
    }
  ]);  

  /**
   * Propriété value
   * @readonly
   * 
   * Valeur du champ de saisie
   * 
   * @access public
   * @memberof InputPhoneComponent
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
   * @memberof InputPhoneComponent
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
   * @memberof InputPhoneComponent
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
   * @memberof InputPhoneComponent
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
   * @memberof InputPhoneComponent
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
   * @memberof InputPhoneComponent
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
   * @memberof InputPhoneComponent
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
   * @memberof InputPhoneComponent
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
   * @memberof InputPhoneComponent
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
   * @memberof InputPhoneComponent
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
   * @memberof InputPhoneComponent
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
   * Contrôle de formulaire réactif
   * 
   * @access public
   * @memberof InputPhoneComponent
   * @since 1.0.0
   * 
   * @type {Signal<FormControl | null>} control
   */
  public readonly control: Signal<FormControl | null> = computed(() => {
    const ngControl: NgControl | null = this.ngControl();
    return ngControl ? ngControl.control as FormControl : null;
  });

  /**
   * Propriété open
   * @readonly
   * 
   * Indique si le menu de sélection
   * est ouvert ou fermé
   * 
   * @access public
   * @memberof InputPhoneComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<boolean>} open
   */
  public readonly open: WritableSignal<boolean> = 
    signal<boolean>(false);

  /**
   * Propriété format
   * @readonly
   * 
   * Format de numéro de téléphone
   * 
   * @access public
   * @memberof InputPhoneComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<InputPhoneFormat>} format
   */
  public readonly format: WritableSignal<InputPhoneFormat> =
    signal<InputPhoneFormat>(this.formats()[0]);
  //#endregion

  //#region Méthodes
  /**
   * Méthode ngOnInit
   * 
   * Méthode du cycle de vie du composant
   * appelée après la construction du composant
   * 
   * @access public
   * @memberof InputPhoneComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public ngOnInit(): void {
    /**
     * Configuration du contrôle de 
     * formulaire
     * 
     * @see InputPhoneComponent#setupControl
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
   * @memberof InputPhoneComponent
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
   * Méthode toggle
   * 
   * Permet de basculer l'état du menu
   * de sélection des formats de numéro
   * 
   * @access public
   * @memberof InputPhoneComponent
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
   * Permet d'afficher le menu de sélection
   * des formats de numéro
   * 
   * @access public
   * @memberof InputPhoneComponent
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
   * Permet de masquer le menu de sélection
   * des formats de numéro
   * 
   * @access public
   * @memberof InputPhoneComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public hide(): void {
    this.open.set(false);
  }
  
  /**
   * Méthode select
   * 
   * Permet de sélectionner un format de
   * numéro de téléphone
   * 
   * @access public
   * @memberof InputPhoneComponent
   * @since 1.0.0
   * 
   * @param {InputPhoneFormat} format - Format de numéro de téléphone
   * 
   * @returns {void} - Ne retourne rien
   */
  public select(format: InputPhoneFormat): void {
    this.format.set(format);
    this.hide();
  }

  /**
   * Méthode isSelected
   * 
   * Permet de vérifier si un format de
   * numéro de téléphone est sélectionné
   * 
   * @access public
   * @memberof InputPhoneComponent
   * @since 1.0.0
   * 
   * @param {InputPhoneFormat} format - Format de numéro de téléphone
   * 
   * @returns {boolean} - Retourne vrai si le format est sélectionné, sinon faux
   */
  public isSelected(format: InputPhoneFormat): boolean {
    const currentFormat: InputPhoneFormat = this.format();
    return currentFormat === format;
  }

  /**
   * Méthode writeValue
   * 
   * Permet aux contrôles de formulaire 
   * réactifs d'écrire une valeur dans 
   * le champ de saisie
   * 
   * @access public
   * @memberof InputPhoneComponent
   * @since 1.0.0
   * 
   * @param {string} value - Valeur du champ de saisie
   * 
   * @returns {void} - Ne retourne rien
   */
  public writeValue(value: string): void {
    const formattedValue: string = this.formatValue(value);
    this.value.set(formattedValue);
  }

  /**
   * Méthode flag
   * 
   * Permet de récupérer l'URL du drapeau
   * du pays en fonction du code pays
   * 
   * @access public
   * @memberof InputPhoneComponent
   * @since 1.0.0
   * 
   * @param {string} countryCode - Code pays
   * 
   * @returns {string} - URL du drapeau du pays
   */
  public flag(countryCode: string): string {
    return `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
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
   * @memberof InputPhoneComponent
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
   * @memberof InputPhoneComponent
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
   * @memberof InputPhoneComponent
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
   * @memberof InputPhoneComponent
   * @since 1.0.0
   * 
   * @param {Event} event - Événement
   * 
   * @returns {void} - Ne retourne rien
   */
  public onInput(event: Event): void {
    let value: string = (event.target as HTMLInputElement).value;
    value = this.formatValue(value);
    this.onChange(value);
  }

  /**
   * Méthode formatValue
   * 
   * Permet de formater la valeur du champ
   * de saisie en fonction du format de numéro
   * de téléphone sélectionné
   * 
   * @access public
   * @memberof InputPhoneComponent
   * @since 1.0.0
   * 
   * @param {string} value - Valeur du champ de saisie
   * 
   * @returns {string} - Valeur formatée
   */
  public formatValue(value: string): string {
    const mask: string = this.format().mask || '';
    const maskChars: string[] = mask.split('');
    const valueChars: string[] = value.split('');
    const formattedValue: string[] = [];

    for (let i = 0, j = 0; i < maskChars.length; i++) {
      if (maskChars[i] === '0') {
        formattedValue.push(valueChars[j] || '');
        j++;
      } else {
        formattedValue.push(maskChars[i]);
      }
    }

    return formattedValue.join('');
  }

  /**
   * Méthode onBlur
   * 
   * Événement déclenché lors de la
   * perte du focus du champ de saisie
   * 
   * @access public
   * @memberof InputPhoneComponent
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
