import { Component, For, JSX, JSXElement } from 'solid-js';
import Icon from '../icons/Icon';
import './_select.css';

const Select: Component<{handleEvent?: JSX.EventHandlerUnion<HTMLSelectElement, InputEvent>, label: string, name: string, options: Array<{label: string, value: string, disabled?: boolean, selected?: boolean}>, firstIsDefault?: boolean, disabled?: boolean}>  = (props) => {
    return (
        <div class="field-container">
            <label for={props.name}>{props.label}</label>
            <div class="select-area">
                <select oninput={props.handleEvent} name={props.name} id={props.name} disabled={props.disabled}>
                    <For each={props.options}>
                        {(option, index) =>
                            <option value={option.value} disabled={option.disabled} selected={option.selected}>{option.label}{index() === 0 && props.firstIsDefault ? ' (Default)': ''}</option> 
                        }
                    </For>
                </select>
                <div class="select-icon">
                    <Icon name="chevron-up-down" />
                </div>
            </div>
        </div>
    )
}

export default Select;