import { Children, useEffect, useState } from 'react'
import { EVENTS } from './const'
import { match } from 'path-to-regexp'

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>Error 404</h1>,
}) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  // add routes form children <Route /> component
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren)

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true
    const matcherUrl = match(path, { decode: decodeURIComponent })

    // hemos usado path-toregexp, para poder detectar rutas dinamicas como por ejemplo
    // /search/:query <- :query es una ruta dinamica
    const matched = matcherUrl(currentPath)
    if (!matched) return false

    // guardamoos lo parametros de la url que eran dinamicas y que hemos extraido con
    // path-to-regexp ejm:
    // si la ruta es /search/:query y la url es /search/javascript
    // matched.params.query === 'javascript'
    routeParams = matched.params // {query: 'javascript'} // /search/javascript
    return true
  })?.Component
  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  )
}
