import { Component, FlowProps, JSX, ParentProps, VoidProps } from "solid-js";
import "./_textArea.css"

const TextArea: Component<FlowProps<{handleKeyup?: JSX.EventHandlerUnion<HTMLTextAreaElement, KeyboardEvent> | undefined, handleEvent?: JSX.EventHandlerUnion<HTMLTextAreaElement, Event>, label: string, description?: string, name: string, optional?: boolean}, string>> = (props) => {
    const rowLength = props.children?.match(/\n/g)?.length || 18;
    return (
        <div class="field-container">
            <label for={props.name} class="field-heading">{props.label}</label>
            {props.optional && <label class="secondary-label">(Optional)</label>}
            {props.description && <label for={props.name} class="field-description">{props.description}</label>}
            <textarea onkeyup={props.handleKeyup} required={!props.optional} onblur={props.handleEvent} rows={rowLength + 1} id={props.name} name={props.name} wrap="off" spellcheck={false}>
                {props.children}
            </textarea>
        </div>
    )
}

export default TextArea;