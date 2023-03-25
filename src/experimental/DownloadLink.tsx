import { Component, JSX } from "solid-js";
import { formatJSON } from "../utils/helpers";

const DownloadLink: Component<{document?: {}, fileName: string, displayText?: string, class?: string, handleClick?: JSX.EventHandlerUnion<HTMLAnchorElement, MouseEvent>}> = (props) => {
    const blob = new Blob([formatJSON(props.document)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    return (
        <a 
            href={url}
            download={props.fileName}
            class={props.class || "download-btn btn btn-primary"}
            onclick={props.handleClick}
        >
            {props.displayText || 'Download'}
        </a>
    ) 
}

export default DownloadLink;