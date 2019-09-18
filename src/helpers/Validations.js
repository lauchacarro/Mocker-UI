

export const validateJson = str => {
    if (/^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

        return true
    } else {

        return false
    }
}

//XML HTML and XHTML
export const validateXML = text => {

    if (document.implementation.createDocument) {
        try {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(text, "application/xml");
        }
        catch (err) {
            return false;
        }

        if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }

}