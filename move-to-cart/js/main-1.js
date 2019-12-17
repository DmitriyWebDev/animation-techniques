whenDocumentReady(() => {


    const cartDropZone = document.getElementsByClassName('js-cartDropZone')[0];
    const cartDropZoneCoords = getCoords(cartDropZone);
    const products = document.getElementsByClassName('js-product');

    for (const product of products) product.addEventListener('click', function (event) {
        console.log(product.id);

        const productCoords = getCoords(product);
        const productCopy = product.cloneNode(true);

        console.log('Drop zone coords', cartDropZoneCoords);
        console.log('Element coords', productCoords);

        productCopy.id = product.id + '-copy';
        productCopy.innerHTML = product.innerHTML + ' copy';
        productCopy.style.position = 'absolute';
        productCopy.style.zIndex = 1000;
        productCopy.style.left = productCoords.left + 'px';
        productCopy.style.top = productCoords.top + 'px';

        const startLeftCoord = parseInt(productCopy.style.left)

        document.body.append(productCopy);

        // top coord
        const targetTopCoord = cartDropZoneCoords.top;
        const productCopyTopCoord = productCoords.top;
        const productCopyTopCoordNeedIncrement = targetTopCoord > productCopyTopCoord;
        const topCoordDifference = productCopyTopCoordNeedIncrement
            ? targetTopCoord - productCopyTopCoord
            : productCopyTopCoord - targetTopCoord;

        // left coord
        const targetLeftCoord = cartDropZoneCoords.left;
        const productCopyLeftCoord = productCoords.left;
        const productCopyLeftCoordNeedIncrement = targetLeftCoord > productCopyLeftCoord;
        const leftCoordDifference = productCopyLeftCoordNeedIncrement
            ? targetLeftCoord - productCopyLeftCoord
            : productCopyLeftCoord - targetLeftCoord;

        animate({
            duration: 1000,
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                const progressPercent = progress * 100;
                if (progress < 0) return false;

                // TOP
                const currentTop = parseInt(productCopy.style.top)
                const animationStepTop = (topCoordDifference / 100) * progressPercent - targetTopCoord
                productCopy.style.top = topCoordDifference - animationStepTop + 'px';

                // LEFT
                const currentLeft = parseInt(productCopy.style.left)
                const animationStepLeft = (leftCoordDifference / 100) * progressPercent
                // console.log(currentLeft, targetLeftCoord, leftCoordDifference, progressPercent, animationStepLeft)
                productCopy.style.left = startLeftCoord + animationStepLeft + 'px';

                if (progressPercent === 100) {
                    setTimeout(() => {
                        productCopy.remove()
                    }, 100)
                }
            }
        });

        function animate({duration, draw, timing}) {

            let start = performance.now();

            requestAnimationFrame(function animate(time) {
                let timeFraction = (time - start) / duration;
                if (timeFraction > 1) timeFraction = 1;

                const progress = timing(timeFraction);

                draw(progress);

                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }

            });
        }

    })


});




