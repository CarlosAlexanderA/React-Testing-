import { EVENTS } from './const'

function navigate(href) {
  window.history.pushState({}, '', href)
  // crear un evento personalizado que no avise cuando se cambia la ruta
  const navegationEvent = new Event(EVENTS.POPSTATE)
  window.dispatchEvent(navegationEvent)
}

export function Link({ target, to, ...props }) {
  const handleClick = event => {
    const isMainEvent = event.button === 0 // prymary click => (right click)
    const isModifiedEvent =
      event.metakey || event.altkey || event.ctrlkey || event.shiftkey
    const isManageableEvent = target === undefined || target === '_self'
    console.log(isModifiedEvent)
    console.log(event.ctrlkey)

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to) // navegacion por SPA(Single Page Aplication)
    }
  }
  return <a onClick={handleClick} target={target} href={to} {...props} />
}
