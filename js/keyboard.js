const Keyboard = {
  init() {
    document.addEventListener("keydown", (e) => this.handle(e));
  },

  handle(e) {
    if (e.target.tagName === "INPUT") return;

    const selected = EditorState.getSelected();
    if (!selected) return;

    const step = e.shiftKey ? 10 : 1;

    switch (e.key) {
      case "Delete":
      case "Backspace":
        e.preventDefault();
        EditorState.deleteElement(selected.id);
        break;

      case "ArrowUp":
        e.preventDefault();
        EditorState.updateElement(selected.id, { y: selected.y - step });
        break;

      case "ArrowDown":
        e.preventDefault();
        EditorState.updateElement(selected.id, { y: selected.y + step });
        break;

      case "ArrowLeft":
        e.preventDefault();
        EditorState.updateElement(selected.id, { x: selected.x - step });
        break;

      case "ArrowRight":
        e.preventDefault();
        EditorState.updateElement(selected.id, { x: selected.x + step });
        break;

      case "Escape":
        EditorState.clearSelection();
        break;
    }
  },
};
