const Canvas = {
  init() {
    this.container = document.getElementById("canvas");
    this.container.addEventListener("click", (e) => {
      if (e.target === this.container) {
        EditorState.clearSelection();
      }
    });

    EditorState.subscribe(() => this.render());
  },

  render() {
    this.container.innerHTML = "";

    EditorState.elements.forEach((el) => {
      const div = document.createElement("div");
      div.className = `canvas-element canvas-element--${el.type}`;
      div.id = el.id;

      if (el.id === EditorState.selectedId) {
        div.classList.add("canvas-element--selected");
      }

      div.style.left = el.x + "px";
      div.style.top = el.y + "px";
      div.style.width = el.width + "px";
      div.style.height = el.height + "px";
      div.style.transform = `rotate(${el.rotation}deg)`;

      if (el.type === "rectangle") {
        div.style.backgroundColor = el.color;
      } else if (el.type === "text") {
        div.textContent = el.text;
        div.style.color = el.color;
      }

      if (el.id === EditorState.selectedId) {
        div.innerHTML += `
          <div class="resize-handle resize-handle--nw"></div>
          <div class="resize-handle resize-handle--ne"></div>
          <div class="resize-handle resize-handle--sw"></div>
          <div class="resize-handle resize-handle--se"></div>
          <div class="rotate-handle"></div>
        `;
      }

      this.container.appendChild(div);

      Drag.init(div, el.id);
      Resize.init(div, el.id);
      Rotate.init(div, el.id);
    });
  },
};
