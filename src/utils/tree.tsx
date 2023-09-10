class Node {
  id: string;
  name: string;
  type: string;
  children: Node[];

  constructor(id: string, name: string, type: string) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.children = [];
  }
}

class Tree {
  root: Node;

  constructor() {
    this.root = {
      id: crypto.randomUUID(),
      name: "Root",
      type: "FOLDER",
      children: [],
    };
  }

  insert(id: string, name: string, type: string, at: string) {
    const newNode = new Node(id, name, type);
    // If root is null insert at start
    if (!this.root) {
      this.root = newNode;
      return;
    }

    // Else traverse and find the node with the given id
    this.insertAt(id, name, type, newNode, this.root, at);
  }

  insertAt(
    id: string,
    name: string,
    type: string,
    newNode: Node,
    root: Node,
    at: string,
  ) {
    if (!root) return;
    if (root.id === at) {
      root.children.push(newNode);
    }
    if (root.children[0]) {
      this.insertAt(id, name, type, newNode, root.children[0], at);
    }
  }
}

const myTree = new Tree();

export { myTree };
