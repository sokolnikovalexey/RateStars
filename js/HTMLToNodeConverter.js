"use strict";
goog.provide("HTMLToNodeConverterComponent");

class HTMLToNodeConverter {
    /**
     * @param {!String} html
     * @returns {!Node}
     */
    static convert(html) {
        let template = document.createElement("template");
        template.innerHTML = html;
        return template.content.firstChild;
    }
}