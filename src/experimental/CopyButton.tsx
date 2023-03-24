import { Component } from "solid-js";
import { copyToClipboard, resetCopyText } from "../utils/helpers";

const CopyButton: Component<{textToCopy: string}> = (props) => {
    let copyButton: HTMLButtonElement | undefined;
    return (
        <button 
            ref={copyButton} 
            onclick={() => copyToClipboard(props.textToCopy, copyButton)} 
            onTransitionEnd={() => resetCopyText(copyButton)} 
            class="btn-neutral btn-hover" 
            aria-live='assertive'
        >
            Copy
        </button>
    )
}

export default CopyButton;