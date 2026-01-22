const Drag = {
  isDragging: false,
  startX: 0,
  startY: 0,
  elementStartX: 0,
  elementStartY: 0,
  targetId: null,

  init(element, id) {
    element.addEventListener("mousedown", (e) => this.start(e, id));
  },

  start(e, id) {
    if (
      e.target.classList.contains("resize-handle") ||
      e.target.classList.contains("rotate-handle")
    ) {
      return;
    }

    e.preventDefault();
    this.isDragging = true;
    this.targetId = id;
    this.startX = e.clientX;
    this.startY = e.clientY;

    const el = EditorState.getElementById(id);
    this.elementStartX = el.x;
    this.elementStartY = el.y;

    EditorState.select(id);

    document.addEventListener("mousemove", this.move);
    document.addEventListener("mouseup", this.end);
  },

  move: (e) => {
    if (!Drag.isDragging) return;

    const dx = e.clientX - Drag.startX;
    const dy = e.clientY - Drag.startY;

    EditorState.updateElement(Drag.targetId, {
      x: Drag.elementStartX + dx,
      y: Drag.elementStartY + dy,
    });
  },

  end: () => {
    Drag.isDragging = false;
    Drag.targetId = null;
    document.removeEventListener("mousemove", Drag.move);
    document.removeEventListener("mouseup", Drag.end);
  },
};
