import { Component, For, Show } from 'solid-js';
import { useRoutes, Link } from "@solidjs/router";

import './App.css';
import { routeConfig, routes } from './routes/routes';
import InfoPanel from './components/InfoPanel';
import Modal from './components/Modal';
import { getDIDAtPosition, setDID } from './stores/store';
import { getDIDs } from './facades/decentralizedID.facade';


const App: Component = () => {
  const Routes = useRoutes(routes);

  const hasDID = () => !!(getDIDAtPosition(0));

  getDIDs('key').then(res => { 
    if (res) {
      setDID(res[0]) 
    }
  }).catch(e => console.error(e));
  
  return (
    <div class="App">
      <header class="header">
        <nav class="site-header">
          <ul>
            <For each={routeConfig.filter(route => route.custom)}>
              {(route) => 
                <li>
                  <Link class="nav" href={route.path}>
                    {route.custom?.title}
                  </Link>
                </li>
              }
            </For>
          </ul>
        </nav>
      </header>
      <main class="main-content">
        <Routes />
        <InfoPanel did={getDIDAtPosition(0)?.id} />
      </main>
      <Show when={!hasDID()}>
        <Modal />
      </Show>
    </div>
  );
};

export default App;
