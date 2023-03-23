import { useNavigate } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import Card from "../composables/Card";
import { DIDDocument, DIDKeyType } from "../facades/decentralizedID.facade";
import { storeKey } from "../facades/keyStore.facade";
import Icon from "../icons/Icon";
import { getDIDAtPosition } from "../stores/store";
import "./_setDID.css";

const SetDID: Component = () => {
    let filePicker: HTMLInputElement | undefined;
    
    const navigate = useNavigate();

    const [importError, setImportError] = createSignal();

    function openFilePicker() {
        filePicker?.click();
    }

    if(getDIDAtPosition(0)) {
        navigate('/')
    }

    function importTempDID() {
        if (filePicker && filePicker.files) {
            let reader = new FileReader();
            reader.readAsText(filePicker.files[0]);
            reader.onload = (e) => {
                if (typeof reader.result === 'string') {
                    const { did, privateKeyBase58, keyType}: { did: DIDDocument, privateKeyBase58: string, keyType: DIDKeyType } = JSON.parse(reader.result)
                    if (did && privateKeyBase58 && keyType) {
                        const keyStoreOptions = {
                            id: did.id,
                            controller: did.verificationMethod[0].controller,
                            base58PrivateKey: privateKeyBase58,
                            type: keyType
                        };
                        storeKey(keyStoreOptions).then(res => console.log(res)).catch(e => console.error(e));
                        localStorage.setItem('importedDID', did.id);
                    } else {
                        let errors = [];
                        if (!did) {
                            errors.push('did')
                        }
                        if (!privateKeyBase58) {
                            errors.push('privateKeyBase58')
                        }
                        if (!keyType) {
                            errors.push('keyType')
                        }
                        setImportError(errors);
                    }
                }
            }
        }
        
    }
    
    return (
        <div class="set-did">
            <div class="set-did-content">
                <div class="set-did-inner">
                    <h1>Set your D-ID.</h1>
                    {/* <p>If you're new to D-IDs, get started by creating a new one. You'll be given secret key material to download as a backup.</p>
                    <p>
                        <a href="#" target="blank">Learn what D-IDs are</a>
                    </p> */}
                    {/* <p>If you're new to D-IDs, you can create one. You'll need a D-ID to use the dashboard. <a href="#" target="blank">Learn what D-IDs are</a></p>
                    <div class="button-group">
                        <div>
                            <button 
                                onclick={() => navigate('create-did')} 
                                class="btn btn-primary btn-full-w"
                            >
                                <Icon name="plus" /> Create new
                            </button>
                        </div>
                        <span class="or-divider">or</span> */}
                        {/* <p>If you already have a D-ID, import your D-ID document and key material as a JSON file.</p>
                        <p>
                            <a href="#" target="blank">See an example JSON file</a>
                        </p> */}
                        {/* <p>Already have a D-ID? See an <a href="#" target="blank">example JSON import file</a></p>
                        <div>
                            <input 
                                oninput={() => importTempDID() } 
                                ref={filePicker} 
                                hidden 
                                type="file" 
                                accept=".json" 
                            />
                            <button 
                                onclick={() => openFilePicker() } 
                                class="btn btn-outline btn-full-w"
                            >
                                <Icon name="arrow-up-tray" /> Import existing
                            </button> 
                        </div>
                        
                    </div> */}
                    <div class="button-card-container">
                        <div class="button-card">
                            <div class="button-card-icon">
                                <Icon name={'plus'} />
                            </div>
                            <p class="subheading">I'm new to D-IDs</p>
                            <a href="#" target="blank">What is a D-ID?</a>
                            <p>Create a new D-ID. You'll need a D-ID to use the dashboard.</p>
                            
                            <div>
                                <button 
                                    onclick={() => navigate('create-did')} 
                                    class="btn btn-primary btn-full-w"
                                >
                                    Create new
                                </button>
                            </div>
                        </div>
                        <div class="button-card">
                            <div class="button-card-icon">
                                <Icon name={'arrow-down-tray'} />
                            </div>
                            {/* <p class="subheading">I already have a D&#8209;ID</p> */}
                            <p class="subheading">I have a D-ID</p>
                            <a href="#" target="blank">See an example JSON</a>
                            <p>Import your D-ID document and private key material as JSON.</p>
                            
                            <div>
                                <input 
                                    oninput={() => importTempDID() } 
                                    ref={filePicker} 
                                    hidden 
                                    type="file" 
                                    accept=".json" 
                                />
                                <button 
                                    onclick={() => openFilePicker() } 
                                    class="btn btn-outline btn-full-w"
                                >
                                    Import existing
                                </button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SetDID;