import { Component, createSignal } from "solid-js";
import Select from "../composables/Select";
import TextArea from "../composables/TextArea";
import TextInput from "../composables/TextInput";
import { getPresentationDefinitions } from "../facades/presentationDefinition.facade";
import { blankPresentationDefinition } from "../mocks/presentation";
import { formatJSON } from "../utils/helpers";
import "./_schemas.css";

const CreateCriteria: Component<{formValues?: { [k: string]: string | undefined; }}> = (props) => {

    const [criteriaProperties, setCriteriaProperties] = createSignal(props.formValues?.['properties'] || blankPresentationDefinition);

    const [ criteria, setCriteria ] = createSignal([]);

    getPresentationDefinitions().then(res => {
        setCriteria(res.definitions);
    });

    const setProperties = (e: string | any) => {
        if (typeof e === 'string') {
            setCriteriaProperties(JSON.parse(e));  
        } else {
            setCriteriaProperties(e); 
        }
    }

    return (
        <article>
            <div>
                {criteria().length ?  
                    <Select 
                        label={"Criteria"} 
                        name={"criteria"} 
                        options={
                            criteria()?.map((definition: { name?: any; id?: any; }) => {
                                return {
                                    label: definition.name, 
                                    value: definition.id
                                    }
                                }) as { label: string; value: string }[]
                            } 
                        handleEvent={(e) => {
                            const { input_descriptors } = criteria()[criteria().findIndex((definition: any) => definition.id === e.currentTarget.value)]
                            setCriteriaProperties({
                                input_descriptors
                            })
                        }}
                    /> : <div>You have no presets to choose from.</div>
                }
                <span class="or-divider">or</span>
                <h3>Define Criteria</h3>
                <p>Add criteria as a Presentation Definition JSON object.
                    <a href="#" target="blank">Learn more about Presentation Definitions</a>
                </p>
                <div>
                    <div>
                        <TextInput 
                            label={"Name of Presentation Definition"} 
                            name={"criteriaName"} 
                            placeholder={"My Awesome Criteria List"}
                            value={props.formValues?.['criteriaName']}
                        />
                    </div>
                    <div>
                        <TextInput 
                            label={"Purpos of Presentation Definition"} 
                            name={"criteriaPurpose"} 
                            placeholder={"Will use this awesome criteria to verify an awesome Credential"}
                            value={props.formValues?.['criteriaPurpose']}
                        />
                    </div>
                    <h3>Add properties</h3>
                    <div>
                        <h4>JSON Editor</h4>
                        <TextArea handleEvent={(e) => setProperties(e.currentTarget.value)} label={"Properties"} name={"properties"}>
                            {formatJSON(criteriaProperties())}
                        </TextArea>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default CreateCriteria;