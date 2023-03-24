import { Component, createSignal, For, Show } from 'solid-js';
import { useRoutes, Link, useRouteData, useNavigate, NavLink } from "@solidjs/router";

import './App.css';
import { routeConfig, routesForNavbar } from './routes/routes';
import InfoPanel from './experimental/InfoPanel';
import Modal from './components/Modal';
import { getDIDAtPosition, setStoreDIDs } from './stores/store';
import { getDIDs } from './facades/decentralizedID.facade';



const App: Component = () => {

  const navigate = useNavigate();

  getDIDs().then(res => { 
    if (res) {
        setStoreDIDs(res);
    }
    if(!getDIDAtPosition(0)) {
        navigate('/set-did', { replace: true });
    }
  }).catch(e => {
    if(!getDIDAtPosition(0)) {
        navigate('/set-did', { replace: true });
    }
  });

  const Routes = useRoutes(routeConfig);
  return (
    <div class="App">
      <header class="header">
          <nav class="site-header">
              <ul>
                  <For each={routesForNavbar}>
                      {(route) => 
                          <li>
                              <NavLink class="nav" href={route.path}>
                                  {route.custom?.title}
                              </NavLink>
                          </li>
                      }
                  </For>
              </ul>
          </nav>
      </header>
      <main class="main-content">
          <Routes />
          {/* <InfoPanel did={getDIDAtPosition(0)?.id} /> */}
      </main>
  </div>
  )
};

export default App;
