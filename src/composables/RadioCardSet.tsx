import { Component, For, JSX } from "solid-js";
import Icon, { IconName } from "../icons/Icon";
import "./_radioCardSet.css";

const RadioCardSet: Component<{handleEvent?: JSX.EventHandlerUnion<HTMLInputElement, InputEvent>, options: {value: string, label: string, description?: string, imageSrc?: string, disabled?: boolean, footerLabel?: string, selected?: boolean}[], name: string, legend: string, description?: string, optional?: boolean, itemsPerRow?: 1 | 2 | 3}> = (props) => {
    return (
        <fieldset class="radio-card-set field-container">
            <legend class="field-heading">{props.legend}</legend>
            {props.optional && <label class="secondary-label">(Optional)</label>}
            {props.description && <label for={props.name} class="field-description">{props.description}</label>}
            <For each={props.options}>
                {(option) => 
                    <div class="radio-container" style={{width: `calc(${100 / (props.itemsPerRow || 1)}% - calc(var(--spacing-unit) * 0.5))`}}>
                        <input required={!props.optional} checked={option.selected} oninput={props.handleEvent} type="radio" name={props.name} id={option.value} value={option.value} disabled={option.disabled}/>
                        <label for={option.value} class="radio-control">
                            <div class="radio-control-content">
                                {option.imageSrc && <img class="radio-card-image" src={option.imageSrc} alt="" />}
                                <div class="radio-control-body">
                                    <p class="radio-control-heading">{option.label}</p>
                                    {option.description && <p class="radio-card-description">{option.description}</p>}
                                    {option.footerLabel && <p class="radio-control-footer-label">{option.footerLabel}</p>}
                                </div>
                            </div>
                        </label>
                    </div>
                }
            </For>
        </fieldset>

    )
}

export default RadioCardSet;