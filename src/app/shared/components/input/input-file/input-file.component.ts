import {
  Component,
  computed,
  ElementRef,
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
  viewChild,
  WritableSignal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
} from '@angular/forms';
import { noop } from 'rxjs';

export type FileInfo = {
  name: string;
  size: FileSize;
  type: string;
};

export type FileSize = {
  value: number;
  unit: string;
};

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  standalone: false,
  styleUrl: './input-file.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true,
    },
  ],
})
export class InputFileComponent implements OnInit, ControlValueAccessor {
  //#region Propriétés
  /**
   * Propriété name
   * @readonly
   *
   * Nom du champ de fichier
   *
   * @access public
   * @memberof InputFileComponent
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
   * Identifiant du champ de fichier
   *
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @type {InputSignal<string>} id
   */
  public readonly id: InputSignal<string> =
    input<string>(`input-${crypto.randomUUID()}`);

  /**
   * Propriété disabled
   * @readonly
   *
   * Champ de fichier désactivé
   *
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @type {ModelSignal<boolean>} disabled
   */
  public readonly disabled: ModelSignal<boolean> = model<boolean>(false);

  /**
   * Propriété multiple
   * @readonly
   *
   * Champ de fichier multiple
   *
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @type {ModelSignal<boolean>} multiple
   */
  public readonly multiple: ModelSignal<boolean> = model<boolean>(false);

  /**
   * Propriété required
   * @readonly
   *
   * Champ de fichier requis
   *
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @type {ModelSignal<boolean>} required
   */
  public readonly required: ModelSignal<boolean> = model<boolean>(false);

  /**
   * Propriété accept
   * @readonly
   *
   * Type de fichier accepté
   *
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @type {InputSignal<string>} accept
   */
  public readonly accept: InputSignal<string> = input<string>('*');

  /**
   * Propriété value
   * @readonly
   *
   * Valeur du champ de fichier
   *
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @type {InputSignal<FileList | null>} value
   */
  public readonly value: ModelSignal<FileList | null> = model<FileList | null>(
    null
  );

  /**
   * Propriété onChange
   *
   * Évènement de changement de valeur
   *
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @type {(value: FileList | null) => void} onChange
   */
  public onChange: (value: FileList | null) => void = noop;

  /**
   * Propriété onTouched
   *
   * Évènement de toucher du champ
   *
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   *


  //#region Événements
 
  /**
   * Propriété onTouched : événement déclenché lors de la perte de focus du champ de saisie
   * @access public
   * @type {() => void} onTouched
   */
  public onTouched: () => void = noop;

  /**
   * Propriété input
   * @readonly
   *
   * Champ de fichier
   *
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @type {Signal<ElementRef<HTMLInputElement>>} input
   */
  public readonly input: Signal<ElementRef<HTMLInputElement>> =
    viewChild.required<ElementRef<HTMLInputElement>>('input');

  /**
   * Propriété injector
   * @readonly
   *
   * Injecteur de dépendances
   *
   * @access private
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * Propriété injector : injecteur de dépendances
   * @readonly
   * @access private
   * @type {Injector} injector
   */
  private readonly injector: Injector = inject<Injector>(Injector);

  /**
   * Propriété ngControl
   * @readonly
   *
   * Contrôle de formulaire Angular
   *
   * @access private
   * @memberof InputFileComponent
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
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @type {InputSignal<string | null>} help
   */
  public readonly help: InputSignal<string | null> = input<string | null>(null);

  /**
   * Propriété control
   * @readonly
   *
   * Contrôle de formulaire réactif
   *
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @type {Signal<FormControl | null>} control
   */
  public readonly control: Signal<FormControl | null> = computed(() => {
    const ngControl: NgControl | null = this.ngControl();
    return ngControl ? (ngControl.control as FormControl) : null;
  });

  /**
   * Propriété errors
   * @readonly
   *
   * Liste des erreurs de validation
   * du champ de saisie
   *
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @type {Signal<ValidationErrors | null>} errors
   */
  public readonly errors: Signal<ValidationErrors | null> = computed(() => {
    /**
     * Contrôle de formulaire
     * réactif
     *
     * @see InputFileComponent#control
     */
    const control: FormControl | null = this.control();

    /**
     * Valeur du champ de saisie
     *
     * @see InputFileComponent#value
     */
    const value: FileList | null = this.value();

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
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @type {InputSignal<string | null>} label
   */
  public readonly label: InputSignal<string | null> = input<string | null>(
    null
  );

  /**
   * Propriété dragging
   * @readonly
   *
   * Champ de fichier glissé
   *
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @type {WritableSignal<boolean>} dragging
   */
  public readonly dragging: WritableSignal<boolean> = signal<boolean>(false);
  
  /**
   * Propriété files
   * @readonly
   * 
   * Liste des fichiers du champ de fichier
   * 
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   * 
   * @type {Signal<FileInfo[]>} files
   */
  public readonly files: Signal<FileInfo[]> = computed(() => {
    const files: FileList | null = this.value();

    if (!files) {
      return [];
    }

    return Array.from(files).map((file: File) => ({
      name: file.name,
      size: this.formatFileSize(file.size),
      type: file.type || '*/*',
    }));
  });

  public readonly totalSize: Signal<FileSize> = computed(() => {
    const files: FileList | null = this.value();

    if (!files) {
      return { value: 0, unit: 'bytes' };
    }

    const totalSize = Array.from(files).reduce((size, file) => size + file.size, 0);

    return this.formatFileSize(totalSize);
  });
  //#endregion



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
   * Méthode formatFileSize
   * 
   * Formate la taille du fichier
   * 
   * @access private
   * @memberof InputFileComponent
   * @since 1.0.0
   * 
   * @param {number} size - Taille du fichier
   * 
   * @returns {FileSize} - Taille du fichier formatée
   */
  private formatFileSize(size: number): FileSize {
    if (size === 0) return { value: 0, unit: 'bytes' };

    const units: string[] = ['bytes_plural', 'kb', 'mb', 'gb', 'tb'];

    const exponent = Math.floor(Math.log(size) / Math.log(1024));
    const value = parseFloat((size / Math.pow(1024, exponent)).toFixed(2));
    const unit = units[exponent];

    return { value, unit };
  }

  /**
   * Méthode setupControl
   *
   * Permet de configurer le contrôle de
   * formulaire réactif (si présent)
   *
   * @access private
   * @memberof InputFileComponent
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

  public onPick(): void {
    this.input().nativeElement.click();
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.dragging.set(false);

    const files: FileList | null = event.dataTransfer?.files || null;

    if (files) {
      this.onChange(files);
      this.onTouched();
      this.value.set(files);
    }
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.dragging.set(true);
  }

  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.dragging.set(false);
  }

  public onRemoveFile(name: string): void {
    const files: FileList | null = this.value();

    if (!files) {
      return;
    }

    const newFiles: File[] = Array.from(files).filter((file: File) => file.name !== name);

    const dataTransfer = new DataTransfer();
    newFiles.forEach(file => dataTransfer.items.add(file));
    this.value.set(newFiles.length ? dataTransfer.files : null);
    this.onChange(newFiles.length ? dataTransfer.files : null);
  }

  /**
   * Méthode writeValue
   *
   * Écrit la valeur du champ de fichier
   *
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @param {FileList | null} value - Valeur du champ de fichier
   *
   * @returns {void} - Rien
   */
  public writeValue(value: FileList | null): void {
    this.value.set(value);
  }

  /**
   * Méthode onFileChange
   * 
   * Gère l'évènement de changement de fichier
   * 
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   * 
   * @param {Event} event - Évènement de changement de fichier
   * 
   * @returns {void} - Rien
   */
  public onFileChange(event: Event): void {
    const files: FileList | null = (event.target as HTMLInputElement).files;

    if (this.multiple()) {
      this.value.set(files);
      this.onChange(files);
    }

    this.onChange(files);
  }




  
  /**
   * Méthode registerOnChange
   *
   * Enregistre l'évènement de changement de valeur
   *
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @param {(value: FileList | null) => void} fn - Fonction de changement de valeur
   *
   * @returns {void} - Rien
   */
  public registerOnChange(fn: (value: FileList | null) => void): void {
    this.onChange = fn;
  }

  /**
   * Méthode registerOnTouched
   *
   * Enregistre l'évènement de toucher du champ
   *
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @param {() => void} fn - Fonction de toucher du champ
   *
   * @returns {void} - Rien
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
   * Définit l'état du champ de fichier
   *
   * @access public
   * @memberof InputFileComponent
   * @since 1.0.0
   *
   * @param {boolean} isDisabled - État du champ de fichier
   *
   * @returns {void} - Rien
   */
  public setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
  //#endregion


  /**
   * Méthode onBlur : Gestion de l'événement de perte de focus
   * @access public
   * @return {void}
   */
  public onBlur(): void {
    this.onTouched();
  }
}
