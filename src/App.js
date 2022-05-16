import React, { useState, useEffect, Suspense } from 'react'

// ** Router Import
import Router from './router/Router'

// ** Routes & Default Routes
import { getRoutes } from './router/routes'

// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'

import { setFavIcon, setTitle } from "@utils"

import "./App.css"

const App = () => {
  const [allRoutes, setAllRoutes] = useState([])
  // ** Hooks
  const { layout } = useLayout()

  useEffect(() => {
    setFavIcon()
    setTitle()
    setAllRoutes(getRoutes(layout))
  }, [layout])

  return (
    <Suspense fallback={null}>
      <Router allRoutes={allRoutes} />
    </Suspense>
  )
}

export default App
