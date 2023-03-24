import { Component } from 'solid-js';
import "./_modal.css";
import { setStoreDIDs } from '../stores/store';
import { DIDDocument } from '../facades/decentralizedID.facade';
import { storeKey } from '../facades/keyStore.facade';
import { useNavigate } from '@solidjs/router';

const Modal: Component = () => {

    const navigate = useNavigate();

    // hide Import DID button until able to explore did import flow
    let showImportDID = false;
    let filePicker: HTMLInputElement | undefined;

    function openFilePicker() {
        filePicker?.click();
    }

    function importTempDID() {
        if (filePicker && filePicker.files) {
            let reader = new FileReader();
            reader.readAsText(filePicker.files[0]);
            reader.onload = (e) => {
                if (typeof reader.result === 'string') {
                    const { did, privateKeyBase58, keyType}: { did: DIDDocument, privateKeyBase58: string, keyType: string } = JSON.parse(reader.result)
                    const keyStoreOptions = {
                        id: did.id,
                        controller: did.verificationMethod[0].controller,
                        base58PrivateKey: privateKeyBase58,
                        type: keyType
                    };
                    storeKey(keyStoreOptions).then(res => {
                        localStorage.setItem('import', keyStoreOptions.id);
                        setStoreDIDs([{ id: keyStoreOptions.id}]);
                        navigate('/d-id');
                    }).catch(e => console.error(e));
                }
            }
        }
    }

    return (
        <div class="modal-did">
            <div class="dialog-content">
                <div>
                    <h1>Set your D-ID.</h1>
                    <p>
                        Jump in by creating a new D-ID or importing an existing D-ID document. 
                    </p>
                    <p>
                        <a href="#" target="blank">Learn about D-IDs</a>
                    </p>
                    <div class="btn-container-sm">
                        <button 
                            onclick={() => navigate('create-did')} 
                            class="btn btn-primary btn-full-w"
                        >
                            Create new
                        </button>

                        { showImportDID && 
                            <> 
                                <span class="or-divider">or</span>
                                <input 
                                    oninput={importTempDID} 
                                    ref={filePicker} 
                                    hidden 
                                    type="file" 
                                    accept=".json" 
                                />
                                <button 
                                    onclick={openFilePicker} 
                                    class="btn btn-outline btn-full-w"
                                >
                                    Import existing
                                </button> 
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
