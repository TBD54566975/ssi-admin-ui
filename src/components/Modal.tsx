import { Component, createSignal, For, Match, onCleanup, onMount, Show, Switch } from 'solid-js';
import OutputSample from '../composables/OutputSample';
import Select from '../composables/Select';
import "./_modal.css";
import { mockDID } from '../mocks/didJson';
import Banner from '../composables/Banner';
import { setDID } from '../stores/store';
import { formatJSON } from '../utils/helpers';

let warnings = [
    `Key rotation is not supported with <code>did:key</code> key type`,
    `Deactivation is not supported with <code>did:key</code> key type`,
    `The private key inside this document can never be recovered once lost.`
]

const Modal: Component = () => {


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
        label: 'Set your Decentralized ID',
        description: 'If this is your first time, start by creating a new DID. If you already have a DID, import your original DID document containing your private key.'
    }
    const success = {
        label: 'Success',
        description: 'Your Public DID will be used to issue and accept Verifiable Credentials.'
    }
    const keyTypes = [
        'Ed25519',
        'X25519',
        'secp256k1',
        'P-224',
        'P-256',
        'P-384',
        'P-521',
        'RSA'
    ].map(type => {
        return {
            label: type,
            value: type
        }
    })
    const [currentStep, setCurrentStep] = createSignal(welcome);

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

    function done() {
        setDID(mockDID);
    }

    return (
        <dialog ref={onboardModal} class="dialog-container">
            <div class="modal-steps">
                <Show when={currentIndex() >= 0}>
                    <aside class="modal-sidebar">
                        <ul>
                            <For each={steps}>
                                {(step, index) => {
                                    return (
                                        <li classList={{ active: step === currentStep(), completed: index() < currentIndex() }}>
                                            {step.label}
                                        </li>
                                    )
                                    }
                                }
                            </For>
                        </ul>
                    </aside>
                    {/* <NavSidebar navItems={steps.map(step => step.label)}></NavSidebar> */}
                </Show>
            </div>
            <div class="dialog-content">
                <Switch>
                    <Match when={currentIndex() === -1}>
                        <Switch>
                            <Match when={currentStep() === welcome}>
                                <div>
                                    <h1>{welcome.label}</h1>
                                    <p>{welcome.description}</p>
                                    <div class="btn-container-sm">
                                        <button onclick={() => setCurrentStep(steps[0])} class="btn btn-primary btn-full-w">Create new</button>
                                        <span class="or-divider">or</span>
                                        <button onclick={() => setCurrentStep(success)} class="btn btn-outline btn-full-w">Import existing</button>
                                    </div>
                                </div>
                            </Match>
                            <Match when={currentStep() === success}>
                                <div>
                                    <h2>{success.label}</h2>
                                    <Banner type="success" message="Your DID was successfully imported" />
                                    <p>{success.description}</p>
                                    <OutputSample codeToDisplay={mockDID.id}/>
                                    <div class="btn-container-flex">
                                        <button onclick={done} class="btn btn-primary">Done</button>
                                    </div>
                                </div>
                            </Match>
                        </Switch>

                    </Match>
                    <Match when={currentIndex() > -1}>
                        <div>
                            <h2>{currentStep().label}</h2>
                            <p>{currentStep().description}</p>
                            <Switch>
                                <Match when={currentIndex() === 0}>
                                    <Select options={keyTypes} label={"Key type"} name={"keyType"} firstIsDefault={true}/>
                                </Match>
                                <Match when={currentIndex() === 1}>
                                    <Banner type="warn" message={warnings[2]} />
                                </Match>
                                <Match when={currentIndex() === 2}>
                                    <OutputSample codeToDisplay={formatJSON(mockDID)} downloadFile="123"/>
                                </Match>
                            </Switch>
                            <div class="btn-container-flex">
                                <Show when={currentIndex() === 0 || currentIndex() === 2}>
                                    <button onclick={() => setCurrentStep(steps[currentIndex() - 1])} class="btn btn-outline">Back</button>
                                </Show>
                                <Switch>
                                    <Match when={currentIndex() === 0}>
                                    <button onclick={() => setCurrentStep(steps[currentIndex() + 1])} class="btn btn-primary">Generate</button>
                                    </Match>
                                    <Match when={currentIndex() === 1}>
                                    <a onclick={() => setCurrentStep(steps[currentIndex() + 1])} class="download-btn btn btn-primary" download="#">Download JSON</a>
                                    </Match>
                                    <Match when={currentIndex() === 2}>
                                    <button onclick={done} class="btn btn-primary">Done</button>
                                    </Match>
                                </Switch>

                            </div>
                        </div>
                    </Match>
                </Switch>
            </div>
        </dialog>
    )
}

export default Modal
