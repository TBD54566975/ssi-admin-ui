import { Component, For, JSX } from 'solid-js';
import Icon from '../icons/Icon';
import './_select.css';

interface SelectInterface {
    handleEvent?: JSX.EventHandlerUnion<HTMLSelectElement, InputEvent>, 
    label: string, 
    description?: string, 
    name: string, 
    options: Array<{
        label: string, 
        value: string, 
        disabled?: boolean, 
        selected?: boolean
    }>, 
    firstIsDefault?: boolean, 
    disabled?: boolean, 
    optional?: boolean
}

const Select: Component<SelectInterface>  = (props) => {
    return (
        <div class="field-container">
            <label for={props.name} class="field-heading">{props.label}</label>
            {props.optional && <label class="secondary-label">(Optional)</label>}
            {props.description && <label for={props.name} class="field-description">{props.description}</label>}
            <div class="select-area">
                <select 
                    required={!props.optional} 
                    oninput={props.handleEvent} 
                    name={props.name} 
                    id={props.name} 
                    disabled={props.disabled}
                >
                    <option disabled selected>Select one</option>
                    <For each={props.options}>
                        {(option, index) =>
                            <option 
                                value={option.value} 
                                disabled={option.disabled} 
                                selected={option.selected}
                            >
                                {option.label}{index() === 0 && props.firstIsDefault ? ' (Default)': ''}
                            </option> 
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