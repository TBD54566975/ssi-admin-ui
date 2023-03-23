import { Component, Match, Switch } from "solid-js";
import NavSidebar from "../components/NavSidebar";
import Select from "../composables/Select";
import Table from "../composables/Table";
import TextArea from "../composables/TextArea";
import TextInput from "../composables/TextInput";
import Dialog from "../containers/Dialog";
import { mockSchemaResponse } from "../mocks/schemaJson";
import { getDIDAtPosition, getStoreManifests } from "../stores/store";
import { formatJSON } from "../utils/helpers";


const mockData = checkForNested(mockSchemaResponse.schema.schema);

function checkForNested(schema: { type: string, properties?: unknown }) {
    if (schema.properties) {
        const schemaProperties = Object.entries(schema.properties);
        const schemaMap: [string, unknown][] = schemaProperties.map(property => {
            if (RegExp(/string|number|boolean/).test(property[1].type)) {
                return [property[0], ""]
            } else {
                return [property[0], checkForNested(property[1])]
            }
        })
        return Object.fromEntries(schemaMap);
    }
}

const Issuance: Component = () => {
    return (
        <article style={{margin: "auto"}}>
            <div class="inner-content">
                <h1>Issue a Credential</h1>
                <div>
                    {/* <Select label={"Issuer"} options={[{label: getDIDAtPosition(0)?.id, value: getDIDAtPosition(0)?.id}]} name={"issuer"}/> */}
                </div>
                <div>
                    <TextInput label={"Recipient"} name={"subject"} placeholder={"did:key:3x4mp73"}></TextInput>
                </div>
                <div>
                    {/* <Select label={"Schema"} options={[{label: mockSchemaResponse.schema.name, value: mockSchemaResponse.id}]} name={"schema"}/> */}
                    {/* <span class="or-divider">or</span>
                    <button class="btn btn-primary">Add new schema</button> */}
                </div>
                <div style={{display: "flex"}}>
                    <TextArea label={"Subject data"} name={"data"}>
                        {formatJSON({})}
                    </TextArea>
                </div>
            </div>
        </article>
    )
}

const IssueCredential: Component = () => {
    return (
        <article class="credentials-container">
            <div class="inner-content">
                <div class="table-header">
                    <h1>Issuance</h1>
                    <Dialog ctaText={"Issue Credential"}>
                        <Issuance />
                    </Dialog>
                </div>
                <div class="container-fallback">
                    You haven't issued any credentials yet.
                </div> 
            </div>
        </article>
    )
}

export default IssueCredential;