import { Component, For } from "solid-js";
import "./_stepfinder.css";

const Stepfinder: Component<{steps: { label: string, active: boolean, completed?: boolean }[]}> = (props) => {
    return (
        <aside class="stepfinder-container">
            <ul>
                <For each={props.steps}>
                    {(step) => {
                        const { label, active, completed } = step;
                        return (
                            <li classList={{ active, completed }}>
                                {label}
                            </li>
                        )
                        }
                    }
                </For>
            </ul>
        </aside>
    )
}

export default Stepfinder;