import { Component, createEffect, createSignal, For, JSX, Show } from "solid-js";
import Icon from "../icons/Icon";
import Select from "./Select";
import TextInput from "./TextInput";
import "./_groupInput.css"

const GroupInput: Component<{setProperties?: any, handleSelectEvent?: JSX.EventHandlerUnion<HTMLSelectElement, InputEvent>, handleTextEvent?: JSX.EventHandlerUnion<HTMLInputElement, Event>, properties: { [key: string] : { type: string } }}> = (props) => {
    const [propertyList, setPropertyList] = createSignal(Object.entries(props.properties));

    return (
        <For each={propertyList()}>
            {(property, index) => 
                <div class="group-inputs">
                    <TextInput 
                        handleEvent={(e) => { 
                            setPropertyList((propList) => { 
                                propList[index()][0] = e.currentTarget.value; 
                                return propList
                            }); 
                            props.setProperties(
                                Object.fromEntries(
                                    propertyList().filter(prop => prop[0])
                                )
                            )
                            }}  
                        label={"Property name"} 
                        name={`propertyName-${index()}`} 
                        placeholder={"Name of property"} 
                        value={property[0]} 
                    />
                    <Select 
                        handleEvent={(e) => { 
                            setPropertyList((propList) => { 
                                propList[index()][1].type = e.currentTarget.value; 
                                return propList
                            }); 
                            props.setProperties(
                                Object.fromEntries(
                                    propertyList().filter(prop => prop[0])
                                )
                            )
                        }} 
                        options={[
                            {label: 'string', value: 'string', selected: property[1].type === 'string'}, 
                            {label: 'boolean', value: 'boolean', selected: property[1].type === 'boolean'}, 
                            {label:'number', value:'number', selected: property[1].type === 'number'}
                        ]} 
                        label={"Property type"} 
                        name={`propertyType-${index()}`}
                    />
                    <button 
                        class="field-interactive-btn visible-on-disabled" 
                        onclick={() => setPropertyList(propertyList().filter((item) => item !== property))} 
                        disabled={propertyList().length === 1}
                    >
                        <Icon name="minus-circle" />
                    </button>
                    <button 
                        disabled={index() !== propertyList().length - 1} 
                        class="field-interactive-btn" 
                        onclick={() => {setPropertyList([...propertyList(), ['', { type: 'string' }]])}}
                    >
                        <Icon name="plus-circle" />
                    </button>
                </div>
            }
        </For>
    ) 
}

export default GroupInput;
