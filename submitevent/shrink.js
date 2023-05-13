const range = document.createRange();
const blocks = document.querySelectorAll('.block');

for (const el of blocks) {
  const text = el.childNodes[0];
  range.setStartBefore(text);
  range.setEndAfter(text);

  const clientRect = range.getBoundingClientRect();
  el.style.width = `${clientRect.width}px`;
}