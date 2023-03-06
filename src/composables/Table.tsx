import { Component, For, onMount } from "solid-js";
import Icon from "../icons/Icon";
import { mockDID } from "../mocks/didJson";
import { formatJSON } from "../utils/helpers";
import OutputSample from "./OutputSample";
import QRCode from "./QRCode";
import "./_table.css";

const Table: Component<{data: Array<{[key: string]: any}>}> = (props) => {
    let outputModal: HTMLDialogElement;

    onMount(() => {
        if (outputModal) {
            outputModal.addEventListener('click', (e) => {
                if (e.target == outputModal) {
                    outputModal.close()
                }
            })
        }
    })
    return (
        <table class="data-table">
            <thead>
                <tr>
                    <For each={Object.keys(props.data[0])}>
                        {(col) => <th>{col}</th>}
                    </For>
                </tr>
            </thead>
            <tbody>
                <For each={props.data}>
                    {(row) => 
                        <tr>
                            <For each={Object.values(row)}>
                                {(cell) => <td>{cell}</td>}
                            </For>
                        </tr>
                    }
                </For>
            </tbody>
        </table>
    )
}

export default Table;