const Properties = {
  init() {
    this.inputs = {
      x: document.getElementById("prop-x"),
      y: document.getElementById("prop-y"),
      width: document.getElementById("prop-width"),
      height: document.getElementById("prop-height"),
      rotation: document.getElementById("prop-rotation"),
      color: document.getElementById("prop-color"),
      text: document.getElementById("prop-text"),
    };

    this.noSelection = document.getElementById("no-selection");
    this.content = document.getElementById("properties-content");
    this.colorGroup = document.getElementById("color-group");
    this.textGroup = document.getElementById("text-group");

    Object.keys(this.inputs).forEach((key) => {
      this.inputs[key].addEventListener("input", (e) => this.onInput(key, e));
    });

    EditorState.subscribe(() => this.render());
  },

  onInput(key, e) {
    const selected = EditorState.getSelected();
    if (!selected) return;

    let value = e.target.value;
    if (["x", "y", "width", "height", "rotation"].includes(key)) {
      value = parseInt(value) || 0;
    }

    EditorState.updateElement(selected.id, { [key]: value });
  },

  render() {
    const selected = EditorState.getSelected();

    if (!selected) {
      this.noSelection.style.display = "block";
      this.content.style.display = "none";
      return;
    }

    this.noSelection.style.display = "none";
    this.content.style.display = "flex";

    this.inputs.x.value = selected.x;
    this.inputs.y.value = selected.y;
    this.inputs.width.value = selected.width;
    this.inputs.height.value = selected.height;
    this.inputs.rotation.value = selected.rotation;
    this.inputs.color.value = selected.color;

    if (selected.type === "text") {
      this.textGroup.style.display = "block";
      this.colorGroup.style.display = "none";
      this.inputs.text.value = selected.text;
    } else {
      this.textGroup.style.display = "none";
      this.colorGroup.style.display = "block";
    }
  },
};
