const Rotate = {
  isRotating: false,
  targetId: null,
  centerX: 0,
  centerY: 0,

  init(element, id) {
    const handle = element.querySelector(".rotate-handle");
    if (handle) {
      handle.addEventListener("mousedown", (e) => this.start(e, id, element));
    }
  },

  start(e, id, element) {
    e.preventDefault();
    e.stopPropagation();

    this.isRotating = true;
    this.targetId = id;

    const rect = element.getBoundingClientRect();
    this.centerX = rect.left + rect.width / 2;
    this.centerY = rect.top + rect.height / 2;

    document.addEventListener("mousemove", this.move);
    document.addEventListener("mouseup", this.end);
  },

  move: (e) => {
    if (!Rotate.isRotating) return;

    const angle = Math.atan2(
      e.clientY - Rotate.centerY,
      e.clientX - Rotate.centerX,
    );

    let degrees = (angle * 180) / Math.PI + 90;
    if (degrees < 0) degrees += 360;

    EditorState.updateElement(Rotate.targetId, {
      rotation: Math.round(degrees),
    });
  },

  end: () => {
    Rotate.isRotating = false;
    Rotate.targetId = null;
    document.removeEventListener("mousemove", Rotate.move);
    document.removeEventListener("mouseup", Rotate.end);
  },
};
