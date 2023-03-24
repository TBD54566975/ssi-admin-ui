import { Component, For, onMount } from "solid-js";
import "./_table.css";

const Table: Component<{data: Array<{[key: string]: any}>, ariaLabelledBy?: string}> = (props) => {
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
        <table class="data-table" aria-labelledby={props.ariaLabelledBy}>
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