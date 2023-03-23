import { Component, JSX } from "solid-js";
import "./_checkbox.css";

const Checkbox: Component<{handleEvent?: JSX.EventHandlerUnion<HTMLInputElement, InputEvent>, name: string, label: string,}> = (props) => {
    return (
        <div class="checkbox-container">
            <label class="checkbox-control">
                <input oninput={props.handleEvent} type="checkbox" name={props.name} id={props.name}/>
                <span>{props.label}</span>
            </label>
        </div>
    )
}

export default Checkbox;


