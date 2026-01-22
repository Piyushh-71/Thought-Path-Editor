const Resize = {
  isResizing: false,
  handle: null,
  startX: 0,
  startY: 0,
  startWidth: 0,
  startHeight: 0,
  startElX: 0,
  startElY: 0,
  targetId: null,

  init(element, id) {
    const handles = element.querySelectorAll(".resize-handle");
    handles.forEach((handle) => {
      handle.addEventListener("mousedown", (e) => this.start(e, id, handle));
    });
  },

  start(e, id, handle) {
    e.preventDefault();
    e.stopPropagation();

    this.isResizing = true;
    this.targetId = id;
    this.handle = handle.className.split("--")[1];
    this.startX = e.clientX;
    this.startY = e.clientY;

    const el = EditorState.getElementById(id);
    this.startWidth = el.width;
    this.startHeight = el.height;
    this.startElX = el.x;
    this.startElY = el.y;

    document.addEventListener("mousemove", this.move);
    document.addEventListener("mouseup", this.end);
  },

  move: (e) => {
    if (!Resize.isResizing) return;

    const dx = e.clientX - Resize.startX;
    const dy = e.clientY - Resize.startY;
    const updates = {};

    switch (Resize.handle) {
      case "se":
        updates.width = Math.max(20, Resize.startWidth + dx);
        updates.height = Math.max(20, Resize.startHeight + dy);
        break;
      case "sw":
        updates.width = Math.max(20, Resize.startWidth - dx);
        updates.height = Math.max(20, Resize.startHeight + dy);
        updates.x = Resize.startElX + dx;
        break;
      case "ne":
        updates.width = Math.max(20, Resize.startWidth + dx);
        updates.height = Math.max(20, Resize.startHeight - dy);
        updates.y = Resize.startElY + dy;
        break;
      case "nw":
        updates.width = Math.max(20, Resize.startWidth - dx);
        updates.height = Math.max(20, Resize.startHeight - dy);
        updates.x = Resize.startElX + dx;
        updates.y = Resize.startElY + dy;
        break;
    }

    EditorState.updateElement(Resize.targetId, updates);
  },

  end: () => {
    Resize.isResizing = false;
    Resize.targetId = null;
    document.removeEventListener("mousemove", Resize.move);
    document.removeEventListener("mouseup", Resize.end);
  },
};
