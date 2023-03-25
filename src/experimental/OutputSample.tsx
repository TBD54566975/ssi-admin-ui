import { Component, Show } from 'solid-js';
import { updateCopyText } from '../utils/helpers';
import CopyButton from './CopyButton';
import './_outputSample.css';

const OutputSample: Component<{codeToDisplay: string, downloadFile?: any}> = (props) => {
    let copyButton: HTMLButtonElement | undefined;

    return (
        <div>
            <output class="did-sample" classList={{"did-sample-download": props.downloadFile}}>
                <menu class="output-menu">
                    <li>
                        <CopyButton textToCopy={props.codeToDisplay} />
                    </li>
                    <Show when={props.downloadFile}>
                        <li>
                            <a class="download-btn btn btn-outline btn-compressed" download="#">Download</a>
                        </li>
                    </Show>
                </menu>
                <pre oncopy={() => updateCopyText(copyButton)}>{props.codeToDisplay}</pre>
            </output>
        </div>
    )
}

export default OutputSample