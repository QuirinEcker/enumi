let status = false;

class ContextMenu {
    openContextMenu(clickedElement, currentList) {
        let contextMenuElement = document.querySelector("#context-menu");
        currentList.appendChild(contextMenuElement)

        console.log(clickedElement);
        contextMenuElement.style.top = clickedElement.offsetTop + "px";
        contextMenuElement.style.left = clickedElement.offsetLeft + "px";
        contextMenuElement.style.display = "block";
        status = true;
    }
}

export {ContextMenu};