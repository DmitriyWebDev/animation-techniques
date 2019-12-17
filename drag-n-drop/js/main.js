whenDocumentReady(() => {

    const itemDndWrapClass = 'js-itemDndWrap';
    const items = document.getElementsByClassName('js-item_draggable')

    for (const item of items) {
        item.onmousedown = function (event) {

            let currentDroppable = null;

            const itemParent = item.parentNode;
            const itemParentHasDndWrap = itemParent.classList.contains(itemDndWrapClass);
            let itemDndWrap = itemParent;

            if (!itemParentHasDndWrap) {
                // wrap item in DND container
                itemDndWrap = document.createElement('div');
                itemDndWrap.classList.add(itemDndWrapClass);
                item.parentNode.insertBefore(itemDndWrap, item);
                itemDndWrap.appendChild(item);
                itemDndWrap.style.position = 'absolute';
                itemDndWrap.style.zIndex = 1000;
            }

            itemDndWrap.ondragstart = function () {
                return false;
            };

            let shiftX = event.clientX - itemDndWrap.getBoundingClientRect().left;
            let shiftY = event.clientY - itemDndWrap.getBoundingClientRect().top;

            moveAt(event.pageX, event.pageY);

            document.body.append(itemDndWrap);

            function moveAt(pageX, pageY) {
                itemDndWrap.style.left = pageX - shiftX + 'px';
                itemDndWrap.style.top = pageY - shiftY + 'px';
            }

            document.addEventListener('mousemove', onMouseMove);

            itemDndWrap.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                itemDndWrap.onmouseup = null;

                console.log('onmouseup')
                if (currentDroppable && currentDroppable.id.includes('draggable-items-wrap')) {
                    currentDroppable.appendChild(item);
                } else {
                    const initialParent = document.getElementById('draggable-items-wrap-1')
                    initialParent.appendChild(item);
                }

                itemDndWrap.remove()
            };

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);

                itemDndWrap.hidden = true;
                let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                itemDndWrap.hidden = false;

                if (!elemBelow) return;

                let droppableBelow = elemBelow.closest('.js-droppable');

                if (currentDroppable !== droppableBelow) {

                    if (currentDroppable) { // null when we were not over a droppable before this event
                        leaveDroppable(currentDroppable);
                    }

                    currentDroppable = droppableBelow;

                    if (currentDroppable) { // null if we're not coming over a droppable now
                        // (maybe just left the droppable)
                        enterDroppable(currentDroppable);
                    }

                }
            }


        };

        function enterDroppable(elem) {
            elem.style.background = 'pink';
        }

        function leaveDroppable(elem) {
            elem.style.background = '';
        }

    }


});




