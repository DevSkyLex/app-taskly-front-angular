import {
  Component,
  computed,
  input,
  InputSignal,
  model,
  ModelSignal,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';

export type DateRange = { start: Date | null; end: Date | null };
export type CalendarMode = 'single' | 'range';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: false,
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  //#region Propriétés
  /**
   * Propriété min
   * @readonly
   *
   * Date minimale autorisée
   *
   * @access public
   * @memberof CalendarComponent
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
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @type {InputSignal<Date>} max
   */
  public readonly max: InputSignal<Date | null> = 
    input<Date | null>(null);

  /**
   * Propriété value
   * @readonly
   *
   * Date sélectionnée
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @type {ModelSignal<Date>} value
   */
  public readonly value: ModelSignal<Date | null | DateRange> = 
    model<Date | null | DateRange>(null);

  /**
   * Propriété mode
   * @readonly
   *
   * Mode d'affichage
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @type {InputSignal<CalendarMode>} mode
   */
  public readonly mode: InputSignal<CalendarMode> = 
    input<CalendarMode>('single');

  /**
   * Propriété selectedRange
   * @readonly
   *
   * Plage de dates sélectionnées
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @type {ModelSignal<Date[]>} selectedRange
   */
  public readonly selectedRange: ModelSignal<DateRange> = model<DateRange>({
    start: null,
    end: null,
  });

  /**
   * Propriété currentMonth
   * @readonly
   *
   * Mois courant
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @type {ModelSignal<Date>} currentMonth
   */
  public readonly currentMonth: ModelSignal<Date> = model<Date>(new Date());

  /**
   * Propriété hoverRangeEnd
   *
   * Date de fin de la plage survolée
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @type {WritableSignal<Date | null>} hoverRangeEnd
   */
  public readonly hoverRangeEnd: WritableSignal<Date | null> =
    signal<Date | null>(null);

  /**
   * Propriété weekDays
   * @readonly
   * 
   * Jours de la semaine
   * 
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   * 
   * @type {Signal<string[]>} weekDays
   */
  public readonly weekDays: Signal<string[]> = computed(() => [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]);
  //#endregion

  //#region Méthodes
  /**
   * Méthode calendarDates (getter)
   *
   * Récupère les dates du calendrier
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @returns {Signal<Date[]>} Dates du calendrier
   */
  public get calendarDates(): Signal<Date[]> {
    return computed(() => {
      const startOfMonth = new Date(
        this.currentMonth().getFullYear(),
        this.currentMonth().getMonth(),
        1
      );
      const startOfWeek = new Date(startOfMonth);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

      const endOfMonth = new Date(
        this.currentMonth().getFullYear(),
        this.currentMonth().getMonth() + 1,
        0
      );
      const endOfWeek = new Date(endOfMonth);
      endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

      const days: Date[] = [];
      let currentDate: Date = new Date(startOfWeek);

      while (currentDate <= endOfWeek) {
        days.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return days;
    });
  }

  /**
   * Méthode hoverDate
   *
   * Gère le survol d'une date
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @param {Date} data Date survolée
   *
   * @returns {void} Ne retourne rien
   */
  public hoverDate(data: Date): void {
    if (
      this.mode() === 'range' &&
      this.selectedRange().start &&
      !this.selectedRange().end
    ) {
      this.hoverRangeEnd.set(data);
    }
  }

  /**
   * Méthode clearHoverRange
   *
   * Efface la plage survolée
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @returns {void} Ne retourne rien
   */
  public clearHoverRange(): void {
    this.hoverRangeEnd.set(null);
  }

  /**
   * Méthode isDateInHoverRange
   *
   * Vérifie si une date est dans la plage survolée
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @param {Date} date Date à vérifier
   *
   * @returns {boolean} Vrai si la date est dans la plage survolée, faux sinon
   */
  public isDateInHoverRange(date: Date): boolean {
    if (
      this.mode() === 'range' &&
      this.selectedRange().start &&
      !this.selectedRange().end &&
      this.hoverRangeEnd()
    ) {
      return (
        (date >= this.selectedRange().start! &&
          date <= this.hoverRangeEnd()!) ||
        (date >= this.hoverRangeEnd()! && date <= this.selectedRange().start!)
      );
    }
    return false;
  }

  /**
   * Méthode isDateInRange
   *
   * Vérifie si une date est dans la plage autorisée
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @param {Date} data Date à vérifier
   *
   * @returns {boolean} Vrai si la date est dans la plage autorisée, faux sinon
   */
  public isDateInRange(data: Date): boolean {
    if (this.min() && data < this.min()!) {
      return false;
    }

    if (this.max() && data > this.max()!) {
      return false;
    }

    return true;
  }

  /**
   * Méthode previousMonth
   *
   * Passe au mois précédent
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @returns {void} Ne retourne rien
   */
  public previousMonth(): void {
    this.currentMonth.set(
      new Date(
        this.currentMonth().getFullYear(),
        this.currentMonth().getMonth() - 1,
        1
      )
    );
  }

  /**
   * Méthode nextMonth
   *
   * Passe au mois suivant
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @returns {void} Ne retourne rien
   */
  public nextMonth(): void {
    this.currentMonth.set(
      new Date(
        this.currentMonth().getFullYear(),
        this.currentMonth().getMonth() + 1,
        1
      )
    );
  }

  /**
   * Méthode isDateInRangeSelection
   *
   * Vérifie si une date est dans la plage de sélection
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @param {Date} data Date à vérifier
   *
   * @returns {boolean} Vrai si la date est dans la plage de sélection, faux sinon
   */
  public isDateInRangeSelection(data: Date): boolean {
    if (
      this.mode() === 'range' &&
      this.selectedRange().start &&
      this.selectedRange().end
    ) {
      return (
        data >= this.selectedRange().start! && data <= this.selectedRange().end!
      );
    }

    return false;
  }

  /**
   * Méthode selectDate
   *
   * Sélectionne une date
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @param {Date} data Date à sélectionner
   *
   * @returns {void} Ne retourne rien
   */
  public selectDate(data: Date): void {
    if (!this.isDateInRange(data)) {
      return;
    }

    if (this.mode() === 'single') {
      this.value.set(data);
    }

    if (this.mode() === 'range') {
      if (
        !this.selectedRange().start ||
        (this.selectedRange().start && this.selectedRange().end)
      ) {
        this.selectedRange.set({ start: data, end: null });
      } else {
        if (data < this.selectedRange().start!) {
          this.selectedRange.set({
            start: data,
            end: this.selectedRange().start,
          });
        } else {
          this.selectedRange.set({
            start: this.selectedRange().start,
            end: data,
          });
        }
      }
    }
  }

  /**
   * Méthode getDateStatus
   *
   * Récupère le statut d'une date
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @param {Date} data Date à vérifier
   *
   * @returns {'selected' | 'range-between' | 'range-start' | 'range-end' | 'disabled' | 'normal'} Statut de la date
   */
  public getDateStatus(
    data: Date
  ):
    | 'selected'
    | 'range-between'
    | 'range-start'
    | 'range-end'
    | 'disabled'
    | 'normal' {
    if (!this.isDateInRange(data)) {
      return 'disabled';
    }

    if (
      this.mode() === 'single' &&
      this.value() &&
      this.isSameDate(data, this.value() as Date)
    ) {
      return 'selected';
    }

    if (
      this.mode() === 'range' &&
      this.selectedRange().start &&
      this.selectedRange().end
    ) {
      if (
        data >= this.selectedRange().start! &&
        data <= this.selectedRange().end!
      ) {
        if (this.isSameDate(data, this.selectedRange().start)) {
          return 'range-start';
        }

        if (this.isSameDate(data, this.selectedRange().end)) {
          return 'range-end';
        }

        return 'range-between';
      }
    }

    return 'normal';
  }

  /**
   * Méthode isDateFromCurrentMonth
   *
   * Vérifie si une date est du mois courant
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @param {Date} data Date à vérifier
   *
   * @returns {boolean} Vrai si la date est du mois courant, faux sinon
   */
  public isDateFromCurrentMonth(data: Date): boolean {
    return data.getMonth() === this.currentMonth().getMonth();
  }

  /**
   * Méthode isSameDate
   *
   * Vérifie si deux dates sont identiques
   *
   * @access public
   * @memberof CalendarComponent
   * @since 1.0.0
   *
   * @param {Date} date1 Première date à comparer
   * @param {Date} date2 Deuxième date à comparer
   *
   * @returns {boolean} Vrai si les dates sont identiques, faux sinon
   */
  public isSameDate(date1: Date | null, date2: Date | null): boolean {
    if (!date1 || !date2) {
      return false;
    }

    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
  //#endregion
}
