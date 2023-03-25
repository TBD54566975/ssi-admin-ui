import { Component, JSX, onCleanup } from "solid-js";
import Icon from "../icons/Icon";
import "./_dialog.css";

const Dialog: Component<{children: JSX.Element, ctaText: string}> = (props) => {
    let modal: HTMLDialogElement | undefined;
    
    function showModal() {
        modal?.showModal();
        document.body.classList.add('p-fixed');
    }

    function closeModal() {
        modal?.close();
        document.body.classList.remove('p-fixed');
    }

    onCleanup(() => {
        if (modal) {
            closeModal();
        }
    })
    return (
        <div>
            <button class="btn btn-primary" onclick={showModal}>
                <Icon name="plus" /> {props.ctaText}
            </button>
            <dialog ref={modal} class="dialog-container" onClose={closeModal}>
                <div class="close-header">
                    <button onclick={closeModal}><Icon name={"close"} /></button>
                </div>
                <div class="dialog-body">
                    {props.children}
                </div>
            </dialog>
        </div>
    )
}

export default Dialog