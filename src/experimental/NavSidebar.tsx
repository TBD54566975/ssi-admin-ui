import { A } from '@solidjs/router';
import { Component, For } from 'solid-js';
import './_navSidebar.css'

const Sidebar: Component<{navItems?: any[]}> = (props) => {
    return (
        <div class="side-panel-container">
            <aside class="side-panel">
                <ul>
                    <For each={props.navItems}>
                        {(item) => {
                            return (
                                <li>
                                    <A activeClass='active' href={item.path} end>{item.custom?.title || item.title}</A>
                                </li>
                            )
                            }
                        }
                    </For>
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar;