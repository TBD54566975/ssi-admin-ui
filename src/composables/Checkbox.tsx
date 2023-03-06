import { Component, JSX } from "solid-js";
import "./_checkbox.css";

const Checkbox: Component<{handleEvent?: JSX.EventHandlerUnion<HTMLInputElement, InputEvent>, name: string, label: string,}> = (props) => {
    return (
        <div class="field-container">
            <input oninput={props.handleEvent} type="checkbox" name={props.name} id={props.name}/>
            <label for={props.name}>{props.label}</label>
        </div>
    )
}

export default Checkbox;