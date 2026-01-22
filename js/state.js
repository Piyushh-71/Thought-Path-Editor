const EditorState = {
  elements: [],
  selectedId: null,
  listeners: [],

  subscribe(fn) {
    this.listeners.push(fn);
  },

  notify() {
    this.listeners.forEach((fn) => fn());
  },

  getElementById(id) {
    return this.elements.find((el) => el.id === id);
  },

  getSelected() {
    return this.getElementById(this.selectedId);
  },

  addElement(element) {
    this.elements.push(element);
    this.selectedId = element.id;
    this.notify();
  },

  updateElement(id, updates) {
    const index = this.elements.findIndex((el) => el.id === id);
    if (index !== -1) {
      this.elements[index] = { ...this.elements[index], ...updates };
      this.notify();
    }
  },

  deleteElement(id) {
    this.elements = this.elements.filter((el) => el.id !== id);
    if (this.selectedId === id) {
      this.selectedId = null;
    }
    this.notify();
  },

  select(id) {
    this.selectedId = id;
    this.notify();
  },

  clearSelection() {
    this.selectedId = null;
    this.notify();
  },

  loadState(data) {
    this.elements = data.elements || [];
    this.selectedId = null;
    this.notify();
  },
};
