function showContent(link) {
    const cont = document.getElementById('contentBody');
    const http = createRequestObject();

    if (http) {
        http.open('GET', link);
        http.onreadystatechange = () => {
            if (http.readyState === 4) {
                cont.innerHTML = http.responseText;
            }
        }
        http.send(null);
    } else {
        document.location = link;
    }

}

function createRequestObject() {
    try {
        return new XMLHttpRequest()
    } catch (exception) {
        try {
            return new ActiveXObject('Msxml2.XMLHTTP')
        } catch (exception) {
            try {
                return new ActiveXObject('Microsoft.XMLHTTP')
            } catch (exception) {
                return null;
            }
        }
    }
}