const Storage = {
  STORAGE_KEY: "thought-path-editor",

  init() {
    document
      .getElementById("btn-save")
      .addEventListener("click", () => this.save());
    document
      .getElementById("btn-export")
      .addEventListener("click", () => this.export());
  },

  save() {
    const data = {
      elements: EditorState.elements,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    alert("Saved to localStorage!");
  },

  load() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        EditorState.loadState(data);
      } catch (e) {
        console.error("Failed to load saved state:", e);
      }
    }
  },

  export() {
    const data = {
      name: "Thought Path Export",
      elements: EditorState.elements,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "thought-path-design.json";
    a.click();
    URL.revokeObjectURL(url);
  },
};
