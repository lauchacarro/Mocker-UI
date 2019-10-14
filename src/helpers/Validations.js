
const ValidateMock = (mock) => {
    if (mock.Active && mock.ContentType === "application/json" && !validateJson(mock.Body)) {
        return {
            error: true,
            message: mock.HttpMethod + " body does not have a correct JSON format"
        }
    }
    else if (mock.Active && mock.ContentType === "application/xml" && !validateXML(mock.Body)) {
        return {
            error: true,
            message: mock.HttpMethod + " body does not have a correct XML format"
        }
    }
    else {
        return {
            error: false
        }
    }
}
export default ValidateMock;

export const validateJson = str => {
    if (/^[\],:{}\s]*$/.test(str.replace(/\\["\\bfnrtu]/g, '@')
        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+]?\d+)?/g, ']')
        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

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