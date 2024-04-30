export function preventScroll() {
  const initialTop = document.scrollingElement?.scrollTop ?? 0
  document.onscroll = function () {
    if (document.scrollingElement) document.scrollingElement.scrollTop = initialTop
  }
  
  return function () {
    document.onscroll = null
  }
}