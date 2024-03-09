export const gotoBlock = (targetBlockElement) => {
  if (targetBlockElement) {
    let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top
    window.scrollTo({
      top: targetBlockElementPosition,
      behavior: 'smooth'
    })
  }
}
