export default function appendParentWithChild(parentEl, tag, childId) {
  const child = document.createElement(tag);
  if (childId) {
    child.id = childId;
  }
  parentEl.append(child);
  return child;
}
