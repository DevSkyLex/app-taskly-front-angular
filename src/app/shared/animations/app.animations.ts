import {
  animate,
  animation,
  AnimationReferenceMetadata,
  style,
} from '@angular/animations';

/**
 * Enum AnimationTiming
 * @enum AnimationTiming
 *
 * Contient les durées des animations
 *
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export enum AnimationTiming {
  VERY_FAST = '100ms',
  FAST = '200ms',
  NORMAL = '300ms',
  SLOW = '400ms',
  VERY_SLOW = '500ms',
}

/**
 * Classe AppAnimations
 * @class AppAnimations
 *
 * Contient les animations de l'application
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export class AppAnimations {
  //#region Méthodes
  /**
   * Méthode expand
   * @static
   *
   * Animation d'expansion d'un élément
   *
   * @access public
   * @memberof AppAnimations
   * @since 1.0.0
   *
   * @type {AnimationReferenceMetadata} expand
   */
  public static readonly expand: AnimationReferenceMetadata = animation([
    style({
      height: '0px',
      opacity: 0,
      overflow: 'hidden',
    }),
    animate(
      '{{ timing }} ease-in-out',
      style({
        height: '*',
        opacity: 1,
        overflow: 'hidden',
      })
    ),
  ]);

  /**
   * Méthode collapse
   * @static
   *
   * Animation de réduction d'un élément
   *
   * @access public
   * @memberof AppAnimations
   * @since 1.0.0
   *
   * @type {AnimationReferenceMetadata} collapse
   */
  public static readonly collapse: AnimationReferenceMetadata = animation([
    style({
      height: '*',
      opacity: 1,
      overflow: 'hidden',
    }),
    animate(
      '{{ timing }} ease-in-out',
      style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden',
      })
    ),
  ], {
    params: {
      timing: AnimationTiming.NORMAL,
    }
  });

  /**
   * Méthode popIn
   * @static
   * 
   * Animation d'apparition d'un élément
   * 
   * @access public
   * @memberof AppAnimations
   * @since 1.0.0
   * 
   * @type {AnimationReferenceMetadata} popIn
   */
  public static readonly popIn: AnimationReferenceMetadata = animation([
    style({
      transform: 'scale(0)',
      opacity: 0,
    }),
    animate(
      '{{ timing }} ease-in-out',
      style({
        transform: 'scale(1)',
        opacity: 1,
      })
    ),
  ], {
    params: {
      timing: AnimationTiming.NORMAL,
    }
  });

  /**
   * Méthode popOut
   * @static
   * 
   * Animation de disparition d'un élément
   * 
   * @access public
   * @memberof AppAnimations
   * @since 1.0.0
   * 
   * @type {AnimationReferenceMetadata} popOut
   */
  public static readonly popOut: AnimationReferenceMetadata = animation([
    style({
      transform: 'scale(1)',
      opacity: 1,
    }),
    animate(
      '{{ timing }} ease-in-out',
      style({
        transform: 'scale(0)',
        opacity: 0,
      })
    ),
  ], {
    params: {
      timing: AnimationTiming.NORMAL,
    }
  });

  /**
   * Méthode fadeIn
   * @readonly
   * @static
   * 
   * Animation de fondu en entrée
   * 
   * @access public
   * @memberof AppAnimations
   * @since 1.0.0
   * 
   * @type {AnimationReferenceMetadata} fadeIn
   */
  public static readonly fadeIn: AnimationReferenceMetadata = animation([
    style({
      opacity: 0,
    }),
    animate(
      '{{ timing }} ease-in-out',
      style({
        opacity: 1,
      })
    ),
  ], {
    params: {
      timing: AnimationTiming.NORMAL,
    }
  });

  /**
   * Méthode fadeOut
   * @readonly
   * @static
   * 
   * Animation de fondu en sortie
   * 
   * @access public
   * @memberof AppAnimations
   * @since 1.0.0
   * 
   * @type {AnimationReferenceMetadata} fadeOut
   */
  public static readonly fadeOut: AnimationReferenceMetadata = animation([
    style({
      opacity: 1,
    }),
    animate(
      '{{ timing }} ease-in-out',
      style({
        opacity: 0,
      })
    ),
  ], {
    params: {
      timing: AnimationTiming.NORMAL,
    }
  });

  /**
   * Méthode slideIn
   * @readonly
   * @static
   * 
   * Permet de slide dans une direction passée 
   * en paramètre
   * 
   * @access public
   * @memberof AppAnimations
   * @since 1.0.0
   * 
   * @type {AnimationReferenceMetadata} slideIn
   */
  public static readonly slideIn: AnimationReferenceMetadata = animation([
    style({
      transform: 'translate({{ translateX }}, {{ translateY }})',
      opacity: 0,
    }),
    animate(
      '{{ timing }} ease-in-out',
      style({
        transform: 'translate(0, 0)',
        opacity: 1,
      })
    ),
  ], {
    params: {
      timing: AnimationTiming.NORMAL,
      translateX: '0',
      translateY: '0',
    }
  });

  /**
   * Méthode slideOut
   * @readonly
   * @static
   * 
   * Permet de slide dans une direction passée 
   * en paramètre
   * 
   * @access public
   * @memberof AppAnimations
   * @since 1.0.0
   * 
   * @type {AnimationReferenceMetadata} slideOut
   */
  public static readonly slideOut: AnimationReferenceMetadata = animation([
    style({
      transform: 'translate(0, 0)',
      opacity: 1,
    }),
    animate(
      '{{ timing }} ease-in-out',
      style({
        transform: 'translate({{ translateX }}, {{ translateY }})',
        opacity: 0,
      })
    ),
  ], {
    params: {
      timing: AnimationTiming.NORMAL,
      translateX: '0',
      translateY: '0',
    }
  });
  //#endregion
}
