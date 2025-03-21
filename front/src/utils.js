export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
    const offsetLeft = card.offsetLeft - mouseMoveDir.x;
    const offsetTop = card.offsetTop - mouseMoveDir.y;

    return {
        x: offsetLeft < 100 ? 100 : offsetLeft,
        y: offsetTop < 80 ? 80 : offsetTop,
    };
};

export function autoGrow(textAreaRef) {
    const { current } = textAreaRef;

    current.style.height = "auto";
    current.style.height = textAreaRef.current.scrollHeight + "px";
}

export const setZIndex = (selectedCard) => {
    selectedCard.style.zIndex = 999;

    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        if (card !== selectedCard) {
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    });
};

export function bodyParser(value) {
    try {
        JSON.parse(value);
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
}
