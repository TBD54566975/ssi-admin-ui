import { JSX, Component, Show } from "solid-js"

interface FormButtonGroupInterface {
    handleBack?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined, 
    handleSubmit?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined, 
    showBack?: boolean, 
    showCta?: boolean, 
    backText?: string, 
    ctaText?: string
}

export const FormButtonGroup: Component<FormButtonGroupInterface> = (props) => {
    return (
        <div class="btn-container-flex">
            <Show when={props.showBack}>
                <button 
                    onclick={props.handleBack} 
                    class="btn btn-outline"
                >
                    { props.backText || 'Back' }
                </button>
            </Show>
            <Show when={props.showCta}>
                <button 
                    id="submit-btn"
                    type="submit"
                    class="btn btn-primary"
                    onclick={props.handleSubmit}
                >
                    { props.ctaText || 'Next' }
                </button>
            </Show>
        </div>
    )
}