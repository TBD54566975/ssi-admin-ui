import { Component, FlowProps, JSX, ParentProps, VoidProps } from "solid-js";
import "./_textArea.css"

const TextArea: Component<FlowProps<{handleEvent?: JSX.EventHandlerUnion<HTMLTextAreaElement, Event>, label: string, name: string}, string>> = (props) => {
    const rowLength = props.children?.match(/\n/g)?.length || 18;
    return (
        <div class="field-container">
            <label for={props.name}>{props.label}</label>
            <textarea onblur={props.handleEvent} rows={rowLength + 1} id={props.name} name={props.name} wrap="off" spellcheck={false}>
                {props.children}
            </textarea>
        </div>
    )
}

export default TextArea;