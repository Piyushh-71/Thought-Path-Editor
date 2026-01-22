const Layers = {
  init() {
    this.list = document.getElementById("layers-list");
    EditorState.subscribe(() => this.render());
  },

  render() {
    this.list.innerHTML = "";

    [...EditorState.elements].reverse().forEach((el) => {
      const li = document.createElement("li");
      li.className = "layer-item";
      if (el.id === EditorState.selectedId) {
        li.classList.add("layer-item--selected");
      }

      const icon = el.type === "rectangle" ? "▢" : "T";
      const name = el.type === "rectangle" ? "Rectangle" : el.text;

      li.innerHTML = `
        <span class="layer-item__icon">${icon}</span>
        <span class="layer-item__name">${name}</span>
      `;

      li.addEventListener("click", () => EditorState.select(el.id));
      this.list.appendChild(li);
    });
  },
};
