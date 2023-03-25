import { Component } from "solid-js";
import NavSidebar from "./NavSidebar";
import TextInput from "../composables/TextInput";

const ResolveDID: Component = () => {
    let dialog: HTMLDialogElement | undefined;
    return (
        <article>
            <NavSidebar navItems={[{path: '/d-id', title: 'DIDs'}, {path: '/d-id/resolve-did', title: 'Resolve a DID'}]}/>
            <div class="inner-content">
                <h1>Resolve a Decentralized ID</h1>
                <p>Confirm details such as validity and status of a Decentralized Identifier.</p>
                <button class="btn btn-primary" onclick={() => dialog?.showModal()}>Resolve a DID</button>
                <dialog ref={dialog}>
                    <div>
                        <h3>Resolve a DID</h3>
                        <p>Enter the DID to retrieve details associated with this identifier.</p>
                        <div>
                            <div>
                                <TextInput label={"DID"} name={"did"} placeholder={"did:key:3x4mp73"} />
                            </div>
                            <button class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </dialog>
            </div>
        </article>
    )
}

export default ResolveDID;