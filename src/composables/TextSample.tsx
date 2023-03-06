import { Component } from "solid-js";
import CopyButton from "./CopyButton";

const TextSample: Component<{textToDisplay: string}> = (props) => {
    return (
        <div class="code-sample">
            <samp>{props.textToDisplay}</samp>
            <CopyButton textToCopy={props.textToDisplay} />
        </div>
    )
}

export default TextSample;

