import './App.css'
import { Suspense, lazy } from 'react'

import page404 from './pages/404' // import estatico
import SearchPage from './pages/Search'

import { Router } from './Router'
import { Route } from './Route'

//solo carga lo que necesita el usuario y luego lo descarga
const LazyAboutPage = lazy(() => import('./pages/About')) // import dinamico
const LazyHomePage = lazy(() => import('./pages/Home')) // import dinamico <- lazy loading

const appRoutes = [
  // {
  //   path: '/',
  //   Component: HomePage,
  // },
  // {
  //   path: '/about',
  //   Component: AboutPage,
  // },
  {
    path: '/:lang/about',
    Component: LazyAboutPage,
  },
  {
    path: '/search/:query',
    Component: SearchPage,
  },
]

function App() {
  return (
    <main>
      <Suspense fallback={<h3>Cargando ...</h3>}>
        <Router routes={appRoutes} defaultComponent={page404}>
          <Route path="/" Component={LazyHomePage} />
          <Route path="/about" Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
