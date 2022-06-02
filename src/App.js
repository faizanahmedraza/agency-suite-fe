import React, { useState, useEffect, Suspense } from "react";

// ** Router Import
import Router from "./router/Router";

// ** Routes & Default Routes
import { getRoutes } from "./router/routes";

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout";

import { setFavIcon, setTitle } from "@utils";

import "./App.css";

import { useSelector, useDispatch } from "react-redux";
import config from "@configs/Config"
import PortalSettingDetailAction from "@store/V1/PortalSetting/DETAIL/PortalSettingDetailAction";

import "@src/Styles/index.css";

const App = () => {
  const [allRoutes, setAllRoutes] = useState([]);
  // ** Hooks
  const dispatch = useDispatch();
  const { layout } = useLayout();

  const {
    portal_settings: {
      update: { isChanged, portal_settings: updatePortalSettings },
      detail: {
        fetched,
        portal_settings: { secondary_color, primary_color },
      },
    },
  } = useSelector((state) => state);

  useEffect(() => {
    if (window.location.hostname !== config.public_url && localStorage.getItem('portal_settings') === null) {
      if (!fetched) return dispatch(PortalSettingDetailAction.portalSettingDetail());
    }
    setFavIcon();
    setTitle();
    setAllRoutes(getRoutes(layout)); 

    if (window !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty(
        "--custom-color",
        `${isChanged ? updatePortalSettings.secondary_color : secondary_color}`
      );
      root.style.setProperty(
        "--custom-color-primary",
        `${isChanged ? updatePortalSettings.primary_color : primary_color}`
      );
    }

  }, [layout, isChanged, fetched])

  return (
    <Suspense fallback={null}>
      <Router allRoutes={allRoutes} />
    </Suspense>
  );
};

export default App;
