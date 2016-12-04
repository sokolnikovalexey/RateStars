"use strict";
goog.require("RateFormComponent");

class RateFormPage {
    constructor() {
        let container = document.body;
        //Already checked form
        for (let i = 0; i < 5; ++i) {
            let checkedForm = new RateForm(container, 5);
            checkedForm.setChecked(i);
            checkedForm.render();
        }

        //Not checked form
        for (let i = 0; i < 10; ++i) {
            let form = new RateForm(container, 5);
            form.render();
        }
    }
}

let page = new RateFormPage();

