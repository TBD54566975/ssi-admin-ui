import { Component, JSX } from "solid-js";
import "./_accordion.css";

const Accordion: Component<{title: string, children: JSX.Element}> = (props) => {
    return (
        <details class="accordion-container">
            <summary>{props.title}</summary>
            <div class="accordion-body">
                {props.children}
            </div>
        </details>
    )
}

export default Accordion;