import {Popup, version as mapboxVersion} from 'mapbox-gl';

const effects = {
    linear(t) {
        return t;
    },

    easeInQuad(t) {
        return t * t;
    },

    easeOutQuad(t) {
        return -t * (t - 2);
    },

    easeInOutQuad(t) {
        if ((t /= 0.5) < 1) {
            return 0.5 * t * t;
        }
        return -0.5 * ((--t) * (t - 2) - 1);
    },

    easeInCubic(t) {
        return t * t * t;
    },

    easeOutCubic(t) {
        return (t -= 1) * t * t + 1;
    },

    easeInOutCubic(t) {
        if ((t /= 0.5) < 1) {
            return 0.5 * t * t * t;
        }
        return 0.5 * ((t -= 2) * t * t + 2);
    },

    easeInQuart(t) {
        return t * t * t * t;
    },

    easeOutQuart(t) {
        return -((t -= 1) * t * t * t - 1);
    },

    easeInOutQuart(t) {
        if ((t /= 0.5) < 1) {
            return 0.5 * t * t * t * t;
        }
        return -0.5 * ((t -= 2) * t * t * t - 2);
    },

    easeInQuint(t) {
        return t * t * t * t * t;
    },

    easeOutQuint(t) {
        return (t -= 1) * t * t * t * t + 1;
    },

    easeInOutQuint(t) {
        if ((t /= 0.5) < 1) {
            return 0.5 * t * t * t * t * t;
        }
        return 0.5 * ((t -= 2) * t * t * t * t + 2);
    },

    easeInSine(t) {
        return -Math.cos(t * (Math.PI / 2)) + 1;
    },

    easeOutSine(t) {
        return Math.sin(t * (Math.PI / 2));
    },

    easeInOutSine(t) {
        return -0.5 * (Math.cos(Math.PI * t) - 1);
    },

    easeInExpo(t) {
        return (t === 0) ? 0 : Math.pow(2, 10 * (t - 1));
    },

    easeOutExpo(t) {
        return (t === 1) ? 1 : -Math.pow(2, -10 * t) + 1;
    },

    easeInOutExpo(t) {
        if (t === 0) {
            return 0;
        }
        if (t === 1) {
            return 1;
        }
        if ((t /= 0.5) < 1) {
            return 0.5 * Math.pow(2, 10 * (t - 1));
        }
        return 0.5 * (-Math.pow(2, -10 * --t) + 2);
    },

    easeInCirc(t) {
        if (t >= 1) {
            return t;
        }
        return -(Math.sqrt(1 - t * t) - 1);
    },

    easeOutCirc(t) {
        return Math.sqrt(1 - (t -= 1) * t);
    },

    easeInOutCirc(t) {
        if ((t /= 0.5) < 1) {
            return -0.5 * (Math.sqrt(1 - t * t) - 1);
        }
        return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },

    easeInElastic(t) {
        let s = 1.70158;
        let p = 0;
        let a = 1;
        if (t === 0) {
            return 0;
        }
        if (t === 1) {
            return 1;
        }
        if (!p) {
            p = 0.3;
        }
        if (a < 1) {
            a = 1;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(1 / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
    },

    easeOutElastic(t) {
        let s = 1.70158;
        let p = 0;
        let a = 1;
        if (t === 0) {
            return 0;
        }
        if (t === 1) {
            return 1;
        }
        if (!p) {
            p = 0.3;
        }
        if (a < 1) {
            a = 1;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(1 / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
    },

    easeInOutElastic(t) {
        let s = 1.70158;
        let p = 0;
        let a = 1;
        if (t === 0) {
            return 0;
        }
        if ((t /= 0.5) === 2) {
            return 1;
        }
        if (!p) {
            p = 0.45;
        }
        if (a < 1) {
            a = 1;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(1 / a);
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
        }
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
    },
    easeInBack(t) {
        const s = 1.70158;
        return t * t * ((s + 1) * t - s);
    },

    easeOutBack(t) {
        const s = 1.70158;
        return (t -= 1) * t * ((s + 1) * t + s) + 1;
    },

    easeInOutBack(t) {
        let s = 1.70158;
        if ((t /= 0.5) < 1) {
            return 0.5 * (t * t * (((s *= (1.525)) + 1) * t - s));
        }
        return 0.5 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
    },

    easeInBounce(t) {
        return 1 - effects.easeOutBounce(1 - t);
    },

    easeOutBounce(t) {
        if (t < (1 / 2.75)) {
            return 7.5625 * t * t;
        }
        if (t < (2 / 2.75)) {
            return 7.5625 * (t -= (1.5 / 2.75)) * t + 0.75;
        }
        if (t < (2.5 / 2.75)) {
            return 7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375;
        }
        return 7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375;
    },

    easeInOutBounce(t) {
        if (t < 0.5) {
            return effects.easeInBounce(t * 2) * 0.5;
        }
        return effects.easeOutBounce(t * 2 - 1) * 0.5 + 0.5;
    }
};

const transforms = {
    scale: (style, value, reverse) => {
        style.transform = `scale(${reverse ? 1 - value : value})`;
    },
    opacity: (style, value, reverse) => {
        style.opacity = reverse ? 1 - value : value;
    }
};

function animate(style, ease, duration, reverse, complete, transform) {
    let cancel;
    const applyTransform = typeof transform === 'string' ? (transforms[transform] || transforms.scale) : transform;
    const start = performance.now();

    const repeat = () => {
        if (cancel) {
            return;
        }

        const elapsed = performance.now() - start;
        const t = duration === 0 ? 1 : Math.min(elapsed / duration, 1);
        const value = effects[ease](t);

        applyTransform(style, value, reverse);

        if (t < 1) {
            requestAnimationFrame(repeat);
        } else if (complete) {
            complete();
        }
    };

    repeat();

    // Returns the cancel function
    return () => {
        cancel = true;
    };
}

function extend(dest, ...sources) {
    for (const src of sources) {
        for (const k in src) {
            if (typeof src[k] === 'object') {
                if (!dest[k]) {
                    dest[k] = {};
                }
                extend(dest[k], src[k]);
            } else {
                dest[k] = src[k];
            }
        }
    }
    return dest;
}

function getOriginFromClassList(classList) {
    for (const className of classList.values()) {
        const matches = className.match(/mapboxgl-popup-anchor-(.+)/);

        if (matches) {
            return matches[1].replace('-', ' ');
        }
    }
}

const defaultOptions = {
    openingAnimation: {
        transform: 'scale',
        duration: 1000,
        easing: 'easeOutElastic'
    },
    closingAnimation: {
        transform: 'scale',
        duration: 300,
        easing: 'easeInBack'
    },
};

/**
 * An animated popup component.
 *
 * @param {Object} [options]
 * @param {Object} [options.openingAnimation] - Options controlling the opening
 *   animation.
 * @param {Object} [options.openingAnimation.duration=1000] - The animation's duration,
 *   measured in milliseconds.
 * @param {Object} [options.openingAnimation.easing] - The easing function name of
 *   the animation. See https://easings.net
 * @param {Object} [options.closingAnimation='easeOutElastic'] - Options controlling
 *   the closing animation.
 * @param {Object} [options.closingAnimation.duration=300] - The animation's duration,
 *   measured in milliseconds.
 * @param {Object} [options.closingAnimation.easing='easeInBack'] - The easing function
 *   name of the animation. See https://easings.net
 */
export default class AnimatedPopup extends Popup {

    constructor(options) {
        super(options);
        extend(this.options, extend({}, defaultOptions, options));
    }

    addTo(...args) {
        if (this._map) {
            // Remove the popup synchronously
            this._remove();
        }

        return super.addTo(...args);
    }

    _remove() {
        const wrapperContainer = this._wrapperContainer;

        if (this._cancelAnimation) {
            this._cancelAnimation();
        }

        if (wrapperContainer && wrapperContainer.parentNode) {
            wrapperContainer.parentNode.removeChild(wrapperContainer);
            delete this._wrapperContainer;
        }

        super.remove();
    }

    remove() {
        if (this._wrapperContainer) {
            const {easing, duration, transform} = this.options.closingAnimation;

            if (this._cancelAnimation) {
                this._cancelAnimation();
            }
            this._cancelAnimation = animate(this._container.style, easing, duration, true, () => {
                // When the animation completes, the popup is fully removed
                this._remove();
            }, transform);
        } else {
            super.remove();
        }

        return this;
    }

    _update(...args) {
        const hasPosition = this._lngLat || this._trackPointer;

        if (!this._map || !hasPosition || !this._content) {
            return;
        }

        const _requestDomTask = this._map._requestDomTask;
        let wrapperContainer = this._wrapperContainer;
        let innerContainer = this._container;
        let transform;

        // If a container is assigned, create its wrapper container
        Object.defineProperty(this, '_container', {
            configurable: true,
            get: () => innerContainer,
            set: container => {
                const {easing, duration, transform} = this.options.openingAnimation;

                wrapperContainer = this._wrapperContainer = document.createElement('div');
                wrapperContainer.className = 'mapboxgl-popup-wrapper';
                wrapperContainer.style.position = 'absolute';
                wrapperContainer.style.willChange = 'transform';
                wrapperContainer.style.pointerEvents = 'none';

                innerContainer = container;
                innerContainer.style.position = 'relative';

                this._map.getContainer().appendChild(wrapperContainer);
                wrapperContainer.appendChild(innerContainer);

                this._cancelAnimation = animate(innerContainer.style, easing, duration, false, null, transform);
            }
        });

        if (mapboxVersion >= '2.3') {
            // Extend _requestDomTask to handle transform changes
            this._map._requestDomTask = fn => {
                _requestDomTask.call(this._map, () => {
                    transform = innerContainer ? innerContainer.style.transform : 'scale(0)';

                    fn();

                    // Apply transform to wrapper
                    wrapperContainer.style.transform = innerContainer.style.transform;
                    innerContainer.style.transform = transform;

                    // Set the transform-origin property based on the anchor position
                    innerContainer.style.transformOrigin = getOriginFromClassList(innerContainer.classList);
                });
            };
        } else {
            transform = innerContainer ? innerContainer.style.transform : 'scale(0)';
        }

        super._update(...args);

        delete this._container;
        this._container = innerContainer;

        if (mapboxVersion >= '2.3') {
            // Revert _requestDomTask
            this._map._requestDomTask = _requestDomTask;
        } else {
            // Apply transform to wrapper
            wrapperContainer.style.transform = innerContainer.style.transform;
            innerContainer.style.transform = transform;

            // Set the transform-origin property based on the anchor position
            innerContainer.style.transformOrigin = getOriginFromClassList(innerContainer.classList);
        }
    }

}
