"use strict";
goog.provide("RateFormStarEventComponent");

class RateFormStarEvent {
    constructor() {
        this._init();
    }

    /**
     * @param {!Object} observer
     * @param {!Function} callbackFuncName
     */
    addObserver(observer, callbackFuncName) {
        this._observer = observer;
        this._callback = callbackFuncName;
    }

    removeObserver() {
        this._init();
    }

    /**
     * @param {!Number} starIndex
     */
    dispatch(starIndex) {
        if (this._observer && this._callback) {
            this._callback.call(this._observer, starIndex);
        }
    }

    _init() {
        /** @private {?Object}*/
        this._observer = null;
        /** @private {?Function}*/
        this._callback = null;
    }
}