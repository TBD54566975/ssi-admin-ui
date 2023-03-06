import { Component, JSX } from "solid-js";

const TextInput: Component<{handleEvent?: JSX.EventHandlerUnion<HTMLInputElement, Event>, label: string, name: string, placeholder: string, value?: string}> = (props) => {
    return (
        <div class="field-container">
            <label for={props.name}>{props.label}</label>
            <input onblur={props.handleEvent} type="text" id={props.name} name={props.name } placeholder={props.placeholder} value={props.value || ''}/>
        </div>
    )
}

export default TextInput;