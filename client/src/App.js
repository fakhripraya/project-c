import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { GlobalStyle } from './config/global'
import NavBar from './components/Navbar'
import Footer from './components/Footer'
import { routes } from './config/properties/path'
import smoothscroll from 'smoothscroll-polyfill';

function App() {

  // kick off the polyfill!
  smoothscroll.polyfill();
  const history = createBrowserHistory({ forceRefresh: true });

  return (
    <Router history={history} basename="/">
      <GlobalStyle />
      <NavBar>
        <Routes>
          {routes.map((item, index) => {
            return <Route
              key={`route-${index}`}
              path={item.path}
              element={<Suspense fallback={<p>Loading...</p>}>{item.component}</Suspense>}
              exact
            />
          }
          )}
        </Routes>
      </NavBar>
      <Footer />
    </Router>
  );
}

export default App;
