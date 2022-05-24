import React, { useState, useEffect, Suspense } from 'react'

// ** Router Import
import Router from './router/Router'

// ** Routes & Default Routes
import { getRoutes } from './router/routes'

// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'

import { setFavIcon, setTitle } from "@utils"

import "./App.css"

import { useSelector } from 'react-redux'

const App = () => {
  const [allRoutes, setAllRoutes] = useState([])
  // ** Hooks
  const { layout } = useLayout()

  const { portal_settings } = useSelector(state => state)

  const { secondary_color , primary_color} = portal_settings.detail.portal_settings

  useEffect(() => {
    setFavIcon()
    setTitle()
    setAllRoutes(getRoutes(layout))

    if (window !== 'undefined') {
      const root = document.documentElement
      root.style.setProperty("--custom-color", `${secondary_color}`)
      root.style.setProperty("--custom-color-primary", `${primary_color}`)
    }

  }, [layout])

  return (
    <Suspense fallback={null}>
      <Router allRoutes={allRoutes} />
    </Suspense>
  )
}

export default App
