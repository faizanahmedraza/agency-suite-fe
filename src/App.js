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

import "@src/Styles/index.css"

const App = () => {
  const [allRoutes, setAllRoutes] = useState([])
  // ** Hooks
  const { layout } = useLayout()

  const { portal_settings, portal_settings: { update: { isChanged, portal_settings: updatePortalSettings } } } = useSelector(state => state)

  const { secondary_color, primary_color } = portal_settings.detail.portal_settings

  useEffect(() => {
    setFavIcon()
    setTitle()
    setAllRoutes(getRoutes(layout))

    if (window !== 'undefined') {
      const root = document.documentElement
      root.style.setProperty("--custom-color", `${isChanged ? updatePortalSettings.secondary_color : secondary_color}`)
      root.style.setProperty("--custom-color-primary", `${isChanged ? updatePortalSettings.primary_color : primary_color}`)
    }

  }, [layout, isChanged])

  return (
    <Suspense fallback={null}>
      <Router allRoutes={allRoutes} />
    </Suspense>
  )
}

export default App
