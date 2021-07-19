import {PopupOptions, Popup} from 'mapbox-gl';

export interface IMapboxGLAnimatedPopupAnimationOptions {
    duration?: number;
    easing?: string;
    transform?: string | ((style: CSSStyleDeclaration, value: number, reverse: boolean)=> void);
}

export interface IMapboxGLAnimatedPopupOptions extends PopupOptions {
    openingAnimation?: IMapboxGLAnimatedPopupAnimationOptions;
    closingAnimation?: IMapboxGLAnimatedPopupAnimationOptions;
}

export class MapboxGLAnimatedPopup extends Popup {
    constructor(opts?:IMapboxGLAnimatedPopupOptions);
}

export default MapboxGLAnimatedPopup;