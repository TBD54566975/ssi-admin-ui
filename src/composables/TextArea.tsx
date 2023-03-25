import { Component, JSX } from "solid-js";
import "./_textArea.css";
import './_formFields.css';

interface TextAreaInterface {
    children: JSX.Element, 
    handleKeyup?: JSX.EventHandlerUnion<HTMLTextAreaElement, KeyboardEvent> | undefined, 
    handleEvent?: JSX.EventHandlerUnion<HTMLTextAreaElement, Event>, 
    label: string, 
    description?: string, 
    name: string, 
    optional?: boolean
}

const TextArea: Component<TextAreaInterface> = (props) => {
    const rowLength = (props.children as string)?.match(/\n/g)?.length || 18;
    return (
        <div class="field-container">
            <label for={props.name} class="field-heading">{props.label}</label>
            {props.optional && <label class="secondary-label">(Optional)</label>}
            {props.description && <label for={props.name} class="field-description">{props.description}</label>}
            <textarea 
                onkeyup={props.handleKeyup} 
                required={!props.optional} 
                onblur={props.handleEvent} 
                rows={rowLength + 1} 
                id={props.name} 
                name={props.name} 
                wrap="off" 
                spellcheck={false}
            >
                {props.children}
            </textarea>
        </div>
    )
}

export default TextArea;