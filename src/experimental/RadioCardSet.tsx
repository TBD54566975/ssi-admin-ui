import { Component, For, JSX } from "solid-js";
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


// Usage: CreateDID Component for selecting DID Method
{/* <RadioCardSet 
    options={[
        {
            label: "Key", 
            value: DIDMethodOptions[0], 
            description: "Better for simplicity",
            imageSrc: Key,
            selected: true
        }, {
            label: "Web", 
            value: DIDMethodOptions[1], 
            description: "Better for flexibility", 
            footerLabel: 'Recommended',
            imageSrc: Password
        }, {
            label: "Ion", 
            value: "ion", 
            description: "Better for enhanced functionality", 
            disabled: true, 
            footerLabel: 'Not yet available',
            imageSrc: Lock
        }
    ]} 
    name={"didType"} 
    legend={"What kind of D-ID do you want to create?"} 
    itemsPerRow={3}
    handleEvent={(e) => setDidMethod(e.currentTarget.value as DIDMethod)}
/>

{ didMethod() === DIDMethodOptions[1] && 
    <TextInput 
        handleEvent={(e) => {setDidWebID(e.currentTarget.value)}} 
        name={"webID"} 
        label={"Website URL"} 
        placeholder={"example.com"}
    />
} */}