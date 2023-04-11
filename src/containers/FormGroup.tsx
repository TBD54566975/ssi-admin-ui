import { JSX, Component } from "solid-js";
import { FormButtonGroup } from "../composables/FormButtonGroup";

interface FormGroupInterface {
    handleChange?: JSX.EventHandlerUnion<HTMLFormElement, Event> | undefined, 
    handleSubmit?: JSX.EventHandlerUnion<HTMLFormElement, Event & { submitter: HTMLElement; }> | undefined, 
    handleBack?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined, 
    children: JSX.Element
}

export const FormGroup: Component<FormGroupInterface> = (props) => {
    return (
        <form onsubmit={props.handleSubmit} autocomplete="off" onchange={props.handleChange}>
            {props.children}
            <FormButtonGroup 
                handleBack={props.handleBack}
                showBack
                showCta
            />
        </form>
    )
}