import ownerDocument from "./ownerDocument";

export default function ownerWindow(node: Node | null): Window {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}
