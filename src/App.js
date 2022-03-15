import React from 'react'
import { Router } from 'react-router-dom'
import routes, { renderRoutes } from './routes';
import { createBrowserHistory } from 'history';
import { AuthProvider } from 'src/contexts/JWTAuthContext';

const App = () => {

  const history = createBrowserHistory({});

  return (
    <>
        <Router history={history}>
          <AuthProvider>
            {renderRoutes(routes)}
          </AuthProvider>
        </Router>
    </>
  )
}

export default App
