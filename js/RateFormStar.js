"use strict";
goog.provide("RateFormStarComponent");
goog.require("HTMLToNodeConverterComponent");
goog.require("RateFormStarEventComponent");

class RateFormStar {
    constructor(index) {
        this._index = index;
        this._hoveredEvent = new RateFormStarEvent();
        this._checkedEvent = new RateFormStarEvent();
        this._displayObject = HTMLToNodeConverter.convert(this._html());
        this._radio = this._displayObject.children[0];
    }

    displayObject() {
        return this._displayObject;
    }

    /**
     * @param {!Object} observer
     * @param {!Function} callback
     */
    addCheckingObserver(observer, callback) {
        this._displayObject.onclick = () => {
            this._checkedEvent.dispatch(this._index);
        };
        this._checkedEvent.addObserver(observer, callback);
    }

    removeCheckingObserver() {
        this._displayObject.onclick = null;
        this._checkedEvent.removeObserver();
    }

    addHoveringObserver(observer, callback) {
        this._displayObject.onmouseover = () => {
            this._hoveredEvent.dispatch(this._index);
        };
        this._hoveredEvent.addObserver(observer, callback);
    }

    removeHoveringObserver() {
        this._displayObject.onmouseover = null;
        this._hoveredEvent.removeObserver();
    }

    disable() {
        this._radio.disabled = true;
    }

    check() {
        this._radio.checked = true;
    }

    setActive(value) {
        value ? this._displayObject.classList.add(RateFormStar.SELECTION_WRAPPER_ACTIVE_MODIFIER_CLASS)
              : this._displayObject.classList.remove(RateFormStar.SELECTION_WRAPPER_ACTIVE_MODIFIER_CLASS);

    }

    _html() {
        const processedIndex = this._index + 1;
        const wrapperClass = " " + RateFormStar.SELECTION_WRAPPER_BLOCK_CLASS;
        return `<label class="${wrapperClass}" title="Rate as ${processedIndex}">
                    <input class="rate-form__selection-item" type="radio" name="rate" value="${processedIndex}" />
                </label>`
    }
}
RateFormStar.SELECTION_WRAPPER_ACTIVE_MODIFIER_CLASS = "rate-form__selection-item-wrapper_active";
RateFormStar.SELECTION_WRAPPER_BLOCK_CLASS = "rate-form__selection-item-wrapper";