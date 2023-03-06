import { Component } from "solid-js";
import NavSidebar from "../components/NavSidebar";
import Select from "../composables/Select";
import TextArea from "../composables/TextArea";
import TextInput from "../composables/TextInput";
import { mockDID } from "../mocks/didJson";
import { mockSchemaResponse } from "../mocks/schemaJson";
import { formatJSON } from "../utils/helpers";

const schemaProps = getDisplayProperties(mockSchemaResponse.schema.schema);

function getDisplayProperties(schema: { type: string, properties?: unknown }) {
    if (schema.properties) {
        const schemaProperties = Object.entries(schema.properties);
        const schemaMap: Array<{label: string, path: string[], schema: string, fallback: string}> | any = schemaProperties.map(property => {
            if (RegExp(/string|number|boolean/).test(property[1].type)) {
                const result = {
                    label: property[0],
                    path: [`$.${property[0]}, $.vc.${property[0]}`],
                    schema: { type: property[1].type },
                    fallback: ""
                }
                return result
            } else {
                const result = {
                    label: property[0],
                    text: "Multiple"
                }
                return result;
            }
        })
        return schemaMap;
    }
}

const CreateCredentialTemplate: Component = () => {
    return (
        <article>
            <NavSidebar navItems={[{path: '/credential-templates', title: 'All Templates'}, {path: '/credential-templates/create-credential-template', title: 'Create Template'}]}/>
            <div class="inner-content">
                <h1>Create Credential Template</h1>
                <div>
                    <h2>About this template</h2>
                    <div>
                        <TextInput label={"Name"} name={"name"} placeholder={"My Awesome Template"}/>
                    </div>
                    <div>
                        <TextInput label={"Description"} name={"description"} placeholder={"My awesome template for auto-generating a Verifiable Credential"}/>
                    </div>
                    <div>
                        <Select label={"Issuer"} name={"issuer"} options={[{label: mockDID.id, value: mockDID.id}]} />
                    </div>
                </div>
                <div>
                    <h2>About the Credential</h2>
                    <div>
                        <TextInput label={"Name"} name={"name"} placeholder={"My Awesome Credential"}/>
                    </div>
                    <div>
                        <TextInput label={"Description"} name={"description"} placeholder={"An awesome Verifiable Credential"}/>
                    </div>
                    <div>
                        <Select label={"Schema"} name={"schema"} options={[{label: mockSchemaResponse.schema.name, value: mockSchemaResponse.id}]} />
                    </div>
                    <h3>Display</h3>
                    <div>
                        <TextInput label={"Title"} name={"title"} placeholder={"Title of the Credential"}/>
                    </div>
                    <div>
                        <TextInput label={"Subtitle"} name={"subtitle"} placeholder={"Subtitle of the Credential"}/>
                    </div>
                    <div>
                        <TextInput label={"Description"} name={"description"} placeholder={"Description of the Credential"}/>
                    </div>
                    <div>
                        <TextArea label={"Properties"} name={"properties"}>
                            {formatJSON(schemaProps)}
                        </TextArea>
                    </div>
                    <h3>Style</h3>
                    <div>
                        <TextInput label={"Background"} name={"background"} placeholder={"#000000"}/>
                    </div>
                    <div>
                        <TextInput label={"Text"} name={"text"} placeholder={"#FFFFFF"}/>
                    </div>
                    <div>
                        <TextInput label={"Hero Image URL"} name={"hero"} placeholder={"https://www.example.com/path/to/imageUrl"}/>
                    </div>
                    <div>
                        <TextInput label={"Thumbnail URL"} name={"thumbnail"} placeholder={"https://www.example.com/path/to/imageUrl"}/>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default CreateCredentialTemplate;