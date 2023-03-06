import { Component, createSignal, For, on, onMount, Show } from 'solid-js';
import { Router, useRoutes, A } from "@solidjs/router";

import logo from './logo.svg';
import './App.css';
import { routeConfig, routes } from './routes/routes';
import InfoPanel from './components/InfoPanel';
import NavSidebar from './components/NavSidebar';
import Modal from './components/Modal';
import { mockDID } from './mocks/didJson';
import { getDIDAtPosition } from './stores/store';
import { getDIDMethods } from './facades/decentralizedID.facade';


const App: Component = () => {
  const Routes = useRoutes(routes);

  const hasDID = () => !!(getDIDAtPosition(0));

  return (
    <div class="App">
      <header class="header">
        <nav class="site-header">
          <ul>
            <For each={routeConfig.filter(route => route.custom)}>
              {(route) => 
                <li>
                  <A class="nav" href={route.path}>
                    {route.custom?.title}
                  </A>
                </li>
              }
            </For>
          </ul>
        </nav>
      </header>
      <main class="main-content">
        <Routes />
        <InfoPanel did={mockDID.id} />
      </main>
      <Show when={!hasDID()}>
        <Modal />
      </Show>
    </div>
  );
};

export default App;
