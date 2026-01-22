const Elements = {
  generateId() {
    return "el_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
  },

  createRectangle() {
    return {
      id: this.generateId(),
      type: "rectangle",
      x: 100,
      y: 100,
      width: 150,
      height: 100,
      rotation: 0,
      color: "#3B82F6",
    };
  },

  createText() {
    return {
      id: this.generateId(),
      type: "text",
      x: 100,
      y: 100,
      width: 200,
      height: 40,
      rotation: 0,
      text: "New Text",
      color: "#E5E7EB",
    };
  },
};
