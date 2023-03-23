import { Component, createSignal, JSX, Match, Show, Switch } from "solid-js";
import NavSidebar from "../components/NavSidebar";
import GroupInput from "../composables/GroupInput";
import Select from "../composables/Select";
import TextArea from "../composables/TextArea";
import TextInput from "../composables/TextInput";
import { getSchemas } from "../facades/schema.facade";
import { mockSchemaRequest, mockSchemaResponse } from "../mocks/schemaJson";
import { getDIDAtPosition } from "../stores/store";
import { formatJSON } from "../utils/helpers";
import "./_schemas.css";

const CreateSchema: Component<{schemas: any, handleChange: (arg0: any) => void, formValues?: any, schemaProps?: any}> = (props) => {

    const [schemaProperties, setSchemaProperties] = createSignal(props.formValues?.['properties'] || {"": { type: 'string' }});


    const isNestedJson = (): boolean => {
        if (schemaProperties()) {
            const schema = Object.values(schemaProperties());
            return  !(schema.every((val: any) => {
                return RegExp(/string|number|boolean/).test(val.type);
            }
            ));
        }
        return false
    }

    const [editorView, setEditorView] = createSignal(props.formValues?.['editorView'] || (isNestedJson() ? 'jsonEditor' : 'richEditor'));


    const setProperties = (e: string | any) => {
        if (typeof e === 'string') {
            setSchemaProperties(JSON.parse(e));  
        } else {
            setSchemaProperties(e); 
        }
    }



    return (
        <article>
            <div>
                {props.schemas?.length ? 
                    <Select 
                        label={"Schema"} 
                        name={"schemaID"} 
                        options={
                            props.schemas?.map((schema: { schema?: any; id?: any; }, index: number) => {
                                return {
                                    label: schema.schema.name, 
                                    value: schema.schema.id,
                                    selected: props.formValues?.['schemaID'] === schema.schema.id
                                    }
                                }) as { label: string; value: string }[]
                            } 
                        handleEvent={(e) => {
                            const selectedSchema = props.schemas[props.schemas.findIndex((schema: any) => schema.schema.id === e.currentTarget.value)];
                            setSchemaProperties(selectedSchema.schema.schema.properties); 
                            props.handleChange(selectedSchema);
                        }}
                    />  : 
                    <div>You have no presets to choose from.</div> 
                }
                {/* <button class="btn btn-primary">Add new</button> */}
                <span class="or-divider">or</span>
                <h3>Create a Schema</h3>
                <div>
                    <div>
                        <TextInput 
                            label={"Schema name"} 
                            name={"schemaName"} 
                            placeholder={"My Awesome Schema"}
                            value={props.formValues?.['schemaName']}/>
                    </div>
                    {/* <h3>Add properties</h3> */}
                    <Select 
                        disabled={isNestedJson()} 
                        handleEvent={(e) => setEditorView(e.currentTarget.value)} 
                        options={[
                            {
                                label: 'Rich Editor', 
                                value: 'richEditor', 
                                selected: props.formValues ? props.formValues?.['editorView'] === 'richEditor' : true
                            }, {
                                label: 'JSON Editor', 
                                value: 'jsonEditor',
                                selected: props.formValues ? props.formValues?.['editorView'] === 'jsonEditor' : false
                            }
                        ]} 
                        label={"Editor View"} 
                        name={"editorView"}
                    />
                    <Show when={isNestedJson()}>
                        <p>Only simple schemas may be edited in the Rich Editor. To edit Schemas using the Rich Editor, make sure all of your schema property types are one of <code>string</code>, <code>boolean</code>, or <code>number</code>.</p>
                    </Show>
                    <Switch>
                        <Match when={editorView() === 'jsonEditor'}>
                            <div>
                                <h4>JSON Editor</h4>
                                <TextArea handleEvent={(e) => setProperties(e.currentTarget.value)} label={"Properties"} name={"jsonProperties"}>{formatJSON(schemaProperties())}</TextArea>
                            </div>
                        </Match>
                        <Match when={editorView() === 'richEditor'}>
                            <div>
                                <h4>Rich Editor</h4>
                                <div>
                                    <p>This is best for simple schemas. Rich Editor does not support complex schemas at this time. Use JSON Editor for complex schemas.</p>
                                </div>
                                <Show when={!isNestedJson()}>
                                    <GroupInput setProperties={setSchemaProperties} properties={schemaProperties()}/>
                                </Show>
                            </div>
                        </Match>
                    </Switch>
                    {schemaProperties() && <input hidden name="properties" value={JSON.stringify(schemaProperties())}/>}
                </div>
            </div>
        </article>
    )
}

export default CreateSchema;