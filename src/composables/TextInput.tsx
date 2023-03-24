import { Component, JSX } from "solid-js";
import './_formFields.css';

interface TextInputInterface {
    handleKeyup?: JSX.EventHandlerUnion<HTMLInputElement, Event> | undefined, 
    handleEvent?: JSX.EventHandlerUnion<HTMLInputElement, Event>, 
    label: string, 
    description?: string, 
    name: string, 
    placeholder: string, 
    value?: string, 
    type?: string, 
    optional?: boolean
}
const TextInput: Component<TextInputInterface> = (props) => {
    return (
        <div class="field-container">
            <label for={props.name} class="field-heading">{props.label}</label>
            {props.optional && <label class="secondary-label">(Optional)</label>}
            {props.description && <label for={props.name} class="field-description">{props.description}</label>}
            <input 
                required={!props.optional} 
                onblur={props.handleEvent} 
                onkeyup={props.handleKeyup} 
                type={props.type || "text"} 
                id={props.name} 
                name={props.name } 
                placeholder={props.placeholder} 
                value={props.value || ''}
            />
            <span></span>
        </div>
    )
}

export default TextInput;