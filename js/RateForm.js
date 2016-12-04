"use strict";
goog.provide("RateFormComponent");
goog.require("RateFormStarComponent");
goog.require("HTMLToNodeConverterComponent");

class RateForm {
    constructor(container, starsCount) {
        this._container = container;

        this._stars = [];
        for (let i = 0; i < starsCount; ++i) {
            let star = new RateFormStar(i);
            star.addHoveringObserver(this, this._onStarHovered);
            star.addCheckingObserver(this, this._onUserVoted);
            this._stars.push(star);
        }

        this._displayObject = HTMLToNodeConverter.convert(RateForm._html());
        this._displayObject.onmouseout = () => {
            this._onRateFormLooseFocus();
        };
    }

    /**
     * @param {!number} checkedStarIndex
     */
    setChecked(checkedStarIndex) {
        if (!this._isValidStarIndex(checkedStarIndex)) {
            return;
        }

        /** @private {?number}*/
        this._checkedStarIndex = checkedStarIndex;
        this._displayObject.onmouseout = null;
        for (let i = 0; i < this._stars.length; ++i) {
            let star = this._stars[i];
            star.removeHoveringObserver();
            star.setActive(i <= checkedStarIndex);
            star.removeCheckingObserver();
            (i !== checkedStarIndex) ? star.disable() : star.check();
        }
    }

    render() {
        for (let i = 0; i < this._stars.length; ++i) {
            const star = this._stars[i];
            this._displayObject.appendChild(star.displayObject());
        }
        this._container.appendChild(this._displayObject);
    }

    _isValidStarIndex(index) {
        return ((index < this._stars.length) && (index >= 0));
    }

    /**
     * @param {!number} starIndex
     */
    _onUserVoted(starIndex) {
        this.setChecked(starIndex);
        this._submit();
    }

    /**
     * @param {!number} starIndex
     */
    _onStarHovered(starIndex) {
        for (let i = 0; i < this._stars.length; ++i) {
            let star = this._stars[i];
            star.setActive(i <= starIndex);
        }
    }

    _submit() {
        const processedIndex = (this._checkedStarIndex + 1);
        alert("Your choice is " + processedIndex);
        //Some submit logic
        //May be you want to override form submission and send JSON?
        //Or save data in LocalStorage and send it later(some problems with internet connection)?
    }

    _onRateFormLooseFocus() {
        for (let i = 0; i < this._stars.length; ++i) {
            let star = this._stars[i];
            star.setActive(false);
        }
    }

    static _html() {
        return `<form action="#some-url" method="post" class="rate-form"></form>`
    }
}