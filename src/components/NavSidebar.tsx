import { A } from '@solidjs/router';
import { Component, For, Show } from 'solid-js';
import './_navSidebar.css'

const Sidebar: Component<{navItems?: any[]}> = (props) => {
    return (
        <div class="side-panel-container">
            <Show when={true}>
                <aside class="side-panel">
                    <ul>
                        <For each={props.navItems}>
                            {(item) => {
                                return (
                                    <li>
                                        <A activeClass='active' href={item.path} end={true}>{item.title}</A>
                                    </li>
                                )
                                }
                            }
                        </For>
                    </ul>
                </aside>
            </Show>
        </div>
    )
}

export default Sidebar;