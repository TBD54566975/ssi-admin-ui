import { Component, Switch, Match } from "solid-js";
import Table from "../composables/Table";
import Dialog from "../containers/Dialog";
import { getManifests } from "../facades/manifest.facade";
import { getStoreManifests, setStoreManifests } from "../stores/store";
import CreateCredential from "./CreateCredential";

const CreateCredentialTemplate: Component = () => {

    if (!getStoreManifests().length) {
        getManifests().then(res =>{
            setStoreManifests(res.manifests);
        })
    }

    return (
        <article class="credentials-container">
            <div class="inner-content">
                <div class="table-header">
                    <h1>Credentials</h1>
                    <Dialog ctaText={"Create Credential"}>
                        <CreateCredential />
                    </Dialog>
                </div>
                <Switch>
                    <Match when={!getStoreManifests().length}>
                        <div class="container-fallback">
                            No credentials to display
                        </div>
                    </Match>
                    <Match when={getStoreManifests().length}>
                        <Table ariaLabelledBy={"Credentials"} data={getStoreManifests().map(credentialManifest => {
                            const manifest = credentialManifest['credential_manifest'];
                            return {
                                "styles": <div style={{
                                    display: "flex", 
                                    "background-color": manifest.output_descriptors[0].styles.background.color,
                                    color: manifest.output_descriptors[0].styles.text.color,
                                    "border-radius": "4px",
                                    padding: "1rem",
                                    margin: "0.5rem",
                                    width: "120px"
                                }}>{manifest.name?.[0]}</div>,
                                "name": manifest.name,
                                "description": manifest.description
                            }
                        })} />
                    </Match>
                </Switch>
            </div>
        </article>
    )
}

export default CreateCredentialTemplate;