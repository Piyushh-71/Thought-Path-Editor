document.addEventListener("DOMContentLoaded", () => {
  Canvas.init();
  Properties.init();
  Layers.init();
  Keyboard.init();
  Storage.init();

  Storage.load();

  document.getElementById("btn-add-rect").addEventListener("click", () => {
    EditorState.addElement(Elements.createRectangle());
  });

  document.getElementById("btn-add-text").addEventListener("click", () => {
    EditorState.addElement(Elements.createText());
  });
});
