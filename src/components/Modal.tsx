import { Component, createSignal, For, Match, onCleanup, onMount, Show, Switch } from 'solid-js';
import OutputSample from '../composables/OutputSample';
import Select from '../composables/Select';
import "./_modal.css";
import { mockDID } from '../mocks/didJson';
import Banner from '../composables/Banner';
import { getDIDAtPosition, setStoreDIDs } from '../stores/store';
import { createDID, DIDDocument, DIDKeyType, DIDMethod } from '../facades/decentralizedID.facade';
import DownloadLink from '../composables/DownloadLink';
import TextSample from '../composables/TextSample';
import { storeKey } from '../facades/keyStore.facade';
import TextInput from '../composables/TextInput';
import RadioCardSet from '../composables/RadioCardSet';
import Checkbox from '../composables/Checkbox';
import Icon from '../icons/Icon';
import Dialog from '../containers/Dialog';
import Stepfinder from '../composables/Stepfinder';
import Accordion from '../containers/Accordion';
import Key from '../assets/img/key-black.svg';
import Password from '../assets/img/password-black.svg';
import Lock from '../assets/img/lock-black.svg';
import CreateDID from './CreateDID';
import { Navigate, useNavigate, useRouteData } from '@solidjs/router';

let warnings = [
    `Key rotation is not supported with <code>did:key</code> key type`,
    `Deactivation is not supported with <code>did:key</code> key type`,
    `The private key inside this document can never be recovered once lost.`
]

const Modal: Component = () => {

    // hide Import DID button until able to explore did import flow
    let showImportDID = false;
    let filePicker: HTMLInputElement | undefined;

    let onboardModal: HTMLDialogElement | undefined;
    const steps = [
        {
            label: 'Key Type',
            description: 'Select a key encryption type.'
        },
        {
            label: 'Download',
            description: 'Your DID Document contains your Private Key. Download your DID Document as a JSON File and store it somewhere safe.'
        },
        {
            label: 'Finish',
            description: 'Your Public DID is ready. Your Public DID is your verifiable, decentralized identifer that you can share with others. Keep a copy somewhere handy.'
        }
    ]
    const welcome = {
        label: 'Set your D-ID',
        description: 'If this is your first time, start by creating a new DID. If you already have a DID, import your original DID document containing your private key.'
    }
    const success = {
        label: 'Success',
        description: 'Your Public DID will be used to issue and accept Verifiable Credentials.'
    }

    const keyTypeOptions: DIDKeyType[] = [
        'Ed25519',
        'X25519',
        'secp256k1',
        'P-224',
        'P-256',
        'P-384',
        'P-521',
        'RSA'
    ]
    const keyTypes = keyTypeOptions.map(type => {
        return {
            label: type,
            value: type
        }
    })

    const keyMethodOptions: DIDMethod[] = [
        'key',
        'web'
    ]

    const keyMethods = keyMethodOptions.map(type => {
        return {
            label: type,
            value: type
        }
    })
    const [currentStep, setCurrentStep] = createSignal(welcome);

    // Before we set the store did, we will set the did temporarily here so that we can keep the modal up for one more informative slide
    const [tempDID, setTempDID] = createSignal<DIDDocument | any>();

    const [didKeyType, setDidKeyType] = createSignal<DIDKeyType>('Ed25519');

    const [didMethod, setDidMethod] = createSignal<DIDMethod>('key');

    const [didWebID, setDidWebID] = createSignal<string>('');

    const currentIndex = () => steps.indexOf(currentStep());

    onMount(() => {
        if (onboardModal) {
            onboardModal.showModal();
            document.body.classList.add('p-fixed');
        }
    })
    onCleanup(() => {
        if (onboardModal) {
            onboardModal.close();
            document.body.classList.remove('p-fixed');
        }
    })

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
                    storeKey(keyStoreOptions).then(res => console.log(res)).catch(e => console.error(e));
                }
            }
        }
        setTempDID(mockDID);
        setCurrentStep(success);
    }

    function createTempDID() {
        // create the did 
        createDID(didMethod(), {
            keyType: didKeyType(),
            didWebId: `did:web:${didWebID()}`
        }).then(res => {setTempDID(res)}).catch(e => console.error(e));
    }

    function setStoreDID() {
        // set it in the store
        setStoreDIDs([tempDID().did])
    }

    const navigate = useNavigate();

    if(getDIDAtPosition(0)) {
        navigate('/')
    }

    return (
        <div class="modal-did">
            <div class="dialog-content">
                <Switch>
                    <Match when={currentIndex() === -1}>
                        <Switch>
                            <Match when={currentStep() === welcome}>
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
                                            </>
                                        }
                                    </div>
                                </div>
                            </Match>
                            <Match when={currentStep() === success}>
                                <div>
                                    <h2>{success.label}</h2>
                                    <Banner type="success" message="Your DID was successfully imported" />
                                    <p>{success.description}</p>
                                    <OutputSample codeToDisplay={getDIDAtPosition(0)?.id}/>
                                    <div class="btn-container-flex">
                                        <button onclick={setStoreDID} class="btn btn-primary">Done</button>
                                    </div>
                                </div>
                            </Match>
                        </Switch>
                    </Match>
                </Switch>
            </div>
            <Show when={currentIndex() > -1}>
                <CreateDID />
            </Show>
        </div>
    )
}

export default Modal
