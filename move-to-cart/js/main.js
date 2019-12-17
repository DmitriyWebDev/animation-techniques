whenDocumentReady(() => {
    const cartDropZone = document.getElementsByClassName('js-cartDropZone')[0]
    const cartDropZoneCoords = getCoords(cartDropZone);
    const products = document.getElementsByClassName('js-product')

    for (const product of products) {
        product.addEventListener('click', function (event) {
            console.log(product.id)

            const productCoords = getCoords(product);
            const productCopy = product.cloneNode(true);

            console.log('Drop zone coords', cartDropZoneCoords)
            console.log('Element coors', productCoords)

            productCopy.id = product.id + '-copy'
            productCopy.innerHTML = product.innerHTML + ' copy'
            productCopy.style.position = 'absolute'
            productCopy.style.zIndex = 1000
            productCopy.style.left = productCoords.left + 'px'
            productCopy.style.top = productCoords.top + 'px'

            document.body.append(productCopy)

            const animationPercentCountStep = 20;

            // top coord
            const targetTopCoord = cartDropZoneCoords.top
            const productCopyTopCoord = productCoords.top
            const productCopyTopCoordNeedIncrement = targetTopCoord > productCopyTopCoord
            const topCoordDifference = productCopyTopCoordNeedIncrement
                ? targetTopCoord - productCopyTopCoord
                : productCopyTopCoord - targetTopCoord
            const topCoordAnimationStep = countAnimationStep(
                animationPercentCountStep,
                topCoordDifference,
                productCopyTopCoordNeedIncrement
            );

            // left coord
            const targetLeftCoord = cartDropZoneCoords.left
            const productCopyLeftCoord = productCoords.left
            const productCopyLeftCoordNeedIncrement = targetLeftCoord > productCopyLeftCoord
            const leftCoordDifference = productCopyLeftCoordNeedIncrement
                ? targetLeftCoord - productCopyLeftCoord
                : productCopyLeftCoord - targetLeftCoord
            const leftCoordAnimationStep = countAnimationStep(
                animationPercentCountStep,
                leftCoordDifference,
                productCopyLeftCoordNeedIncrement
            );

            // console.log('topCoordDifference', topCoordDifference)
            // console.log('topCoord need increment', productCopyTopCoordNeedIncrement)
            // console.log('leftCoordDifference', leftCoordDifference)
            // console.log('leftCoord need increment', productCopyLeftCoordNeedIncrement)

            const animationInterval = setInterval(() => {
                const top = (parseInt(productCopy.style.top) <= targetTopCoord ||
                    parseInt(productCopy.style.top) + topCoordAnimationStep <= targetTopCoord)
                    ? targetTopCoord
                    : parseInt(productCopy.style.top) + topCoordAnimationStep
                const left = (parseInt(productCopy.style.left) >= targetLeftCoord ||
                    parseInt(productCopy.style.left) + leftCoordAnimationStep >= targetLeftCoord)
                    ? targetLeftCoord
                    : parseInt(productCopy.style.left) + leftCoordAnimationStep

                moveElement(
                    productCopy,
                    top,
                    left
                )

                if (top === targetTopCoord && left === targetLeftCoord) {
                    clearInterval(animationInterval)

                    setTimeout(() => {
                        productCopy.remove()
                    }, 500)
                }

            }, 200)

            function countAnimationStep(
                percentCountStep = 50,
                difference,
                targetValNeedIncrement // false
            ) {
                const diffOnePercent = Math.round(difference / 100)
                return !targetValNeedIncrement
                    ? (diffOnePercent * percentCountStep) * -1
                    : (diffOnePercent * percentCountStep)
            }

        })
    }


});




