function whenDocumentReady(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function getElementCenterCoords(elem) {
    let elemPageCoords = getCoords(elem)

    return {
        top: elemPageCoords.top + elem.offsetWidth / 2,
        left: elemPageCoords.left + elem.offsetHeight / 2,
    };
}

function moveElement(elem, top, left) {
    elem.style.top = top + 'px'
    elem.style.left = left + 'px'
}


