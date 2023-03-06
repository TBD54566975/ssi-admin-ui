import { Component, createSignal, JSX, Match, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import NavSidebar from "../components/NavSidebar";
import Checkbox from "../composables/Checkbox";
import GroupInput from "../composables/GroupInput";
import Select from "../composables/Select";
import TextArea from "../composables/TextArea";
import TextInput from "../composables/TextInput";
import { mockDID } from "../mocks/didJson";
import { mockSchemaRequest } from "../mocks/schemaJson";
import { formatJSON } from "../utils/helpers";

const CreateSchema: Component = () => {
    const [editorView, setEditorView] = createSignal('jsonEditor');

    const [schemaProperties, setSchemaProperties] = createSignal(mockSchemaRequest.schema.properties);

    const setProperties = (e: string | any) => {
        if (typeof e === 'string') {
            setSchemaProperties(JSON.parse(e));  
        } else {
            setSchemaProperties(e); 
        }
    }

    const isNestedJson = (): boolean => {
        return !(Object.values(schemaProperties()).every((val) => RegExp(/string|number|boolean/).test(val.type)));
    }



    return (
        <article>
            <NavSidebar navItems={[{path: '/schemas', title: 'All Schemas'}, {path: '/schemas/create-schema', title: 'Create a Schema'}]}/>
            <div class="inner-content">
                <h1>Create a Schema</h1>
                <div>
                    <div>
                        <p>This is best for simple schemas. Rich Editor does not support complex schemas at this time. Use JSON Editor for complex schemas.</p>
                    </div>
                    <div>
                        <TextInput label={"Schema name"} name={"schemaName"} placeholder={"My Awesome Schema"}/>
                    </div>
                    <div>
                        <Select options={[{label: mockDID.id, value: mockDID.id}]} label={"Author"} name={"author"}/>
                    </div>
                    <div>
                        <TextInput label={"Schema description"} name={"schemaDescription"} placeholder={"Schema to be used for an Awesome Verifiable Credential"}/>
                    </div>
                    {/* <div>
                        <Checkbox name={"Sign"} label={"Sign with author key (recommended)"} />
                    </div> */}
                    
                    <h3>Add properties</h3>
                    <Select disabled={isNestedJson()} handleEvent={(e) => setEditorView(e.currentTarget.value)} options={[{label: 'JSON Editor', value: 'jsonEditor'}, {label: 'Rich Editor', value: 'richEditor'}]} label={"Editor View"} name={"editorView"}/>
                    <Show when={isNestedJson()}>
                        <p>Only simple schemas may be edited in the Rich Editor. To edit Schemas using the Rich Editor, make sure all of your schema property types are one of <code>string</code>, <code>boolean</code>, or <code>number</code>.</p>
                    </Show>
                    <Switch>
                        <Match when={editorView() === 'jsonEditor'}>
                            <div>
                                <h4>JSON Editor</h4>
                                <TextArea handleEvent={(e) => setProperties(e.currentTarget.value)} label={"Properties"} name={"properties"}>{formatJSON(schemaProperties())}</TextArea>
                            </div>
                        </Match>
                        <Match when={editorView() === 'richEditor'}>
                            <div>
                                <h4>Rich Editor</h4>
                                <Show when={!isNestedJson()}>
                                    <GroupInput setProperties={setSchemaProperties} properties={schemaProperties()}/>
                                </Show>
                            </div>
                        </Match>
                    </Switch>
                </div>
            </div>
        </article>
    )
}

export default CreateSchema;