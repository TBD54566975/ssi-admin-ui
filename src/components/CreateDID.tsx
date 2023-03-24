import { Component, createSignal, Match, Show, Switch } from "solid-js";
import Banner from "../composables/Banner";
import Select from "../composables/Select";
import TextInput from "../composables/TextInput";
import Accordion from "../containers/Accordion";
import { DIDMethod, DIDKeyType, keyTypeOptions, createDID } from "../facades/decentralizedID.facade";
import { setStoreDIDs } from "../stores/store";
import "./_createDID.css";
import SidebarLayout from "../containers/SidebarLayout";
import { useNavigate } from "@solidjs/router";
import { formatJSON } from "../utils/helpers";

const CreateDID: Component = () => {
    
    const navigate = useNavigate();

    const steps = [
        {
            label: 'Create',
            description: 'You\'ll use your D-ID to issue, verify, and sign Credentials. Optionally link your new D-ID with your website. Otherwise, skip ahead and proceed.'
        },
        {
            label: 'Save',
            description: 'Your D-ID is almost ready. You\'re about to download a sensitive document that contains your private key. Don\'t share it with anyone. Secure it somewhere safe.'
        },
    ];

    const [currentStep, setCurrentStep] = createSignal<{label: string, description: string}>(steps[0]);

    const [didKeyType, setDidKeyType] = createSignal<DIDKeyType>(keyTypeOptions[0]);

    const [didWebID, setDidWebID] = createSignal<string>();

    async function createTempDID() {
        // create the did 
        let didMethod: DIDMethod = 'key';
        if (didWebID()) {
            didMethod = 'web';
        }
        createDID(didMethod, {
            keyType: didKeyType(),
            ...didWebID() && { didWebId: `did:web:${didWebID()}` }
        }).then(res => {
            if (res) {
                setStoreDIDs([ res.did ]);
                const blob = new Blob([formatJSON(res)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                
                const anchor = document.createElement('a');
                anchor.setAttribute('hidden', 'true');
                anchor.setAttribute('download', 'did.json');
                anchor.setAttribute('href', url);
                anchor.click();
                navigate('/', { replace: true });
            }
        }).catch(e => console.error(e));
    }
    

    return (
        <div class="create-did-container">
            <SidebarLayout sidebarSteps={
                steps.map((step, index) => { 
                    return {
                        label: step.label, 
                        active: step === currentStep(), 
                        completed:  index < steps.indexOf(currentStep())
                    }
                })
            }>
                <section class="create-did-inner">
                    <h2>{currentStep().label}</h2>
                    <p class="subheading">{currentStep().description}</p>
                    <Switch>
                        <Match when={currentStep() === steps[0]}>
                            <Accordion title={"Link website (optional)"}>
                                <TextInput 
                                    type="url"
                                    handleEvent={(e) => {setDidWebID(e.currentTarget.value)}} 
                                    name={"webID"} 
                                    label={"Website URL"} 
                                    optional
                                    description={"You'll need to verify ownership of the domain before you can start using it."}
                                    placeholder={"example.com"}
                                />
                                <a href="#" target="blank">Learn about getting started with Web D-IDs </a>
                            </Accordion>

                            <Accordion title={"Advanced"}>
                                <Select 
                                    handleEvent={(e) => setDidKeyType(e.currentTarget.value as DIDKeyType)} 
                                    options={keyTypeOptions.map(option => { 
                                            return { 
                                                label: option, 
                                                value: option
                                            }
                                        })} 
                                    label={"Encryption algorithm"} 
                                    description={"The cryptographic algorithm family to use to create your D-ID"}
                                    name={"keyType"} 
                                    firstIsDefault
                                />
                                <a href="#" target="blank">Learn about key encryption algorithms</a>
                            </Accordion>
                        </Match>

                        <Match when={currentStep() === steps[1]}>
                            <Banner 
                                type="warn"
                                message={'The private key inside this document can never be recovered if lost.'} 
                            />
                        </Match>
                    </Switch>

                    <div class="btn-container-flex">
                        <Show when={true}>
                            <button 
                                onclick={() => {
                                    if (currentStep() === steps[0]) {
                                        history.back();
                                    }
                                    setCurrentStep(
                                        steps[steps.indexOf(currentStep()) - 1]
                                    )}} 
                                class="btn btn-outline"
                            >
                                Back
                            </button>
                        </Show>
                        <Switch>
                            <Match when={currentStep() === steps[0]}>
                                <button 
                                    onclick={() => {
                                        setCurrentStep(
                                            steps[steps.indexOf(currentStep()) + 1]
                                        )}} 
                                    class="btn btn-primary"
                                >
                                    Next
                                </button>
                            </Match>
                            <Match when={currentStep() === steps[1]}>
                                <button 
                                    onclick={createTempDID} 
                                    class="btn btn-primary"
                                >
                                    Download and Finish
                                </button>
                            </Match>
                        </Switch>
                    </div>
                </section>
            </SidebarLayout>
        </div>
    )
}

export default CreateDID;




{/* <RadioCardSet 
    options={[
        {
            label: "Key", 
            value: DIDMethodOptions[0], 
            description: "Better for simplicity",
            imageSrc: Key,
            selected: true
        }, {
            label: "Web", 
            value: DIDMethodOptions[1], 
            description: "Better for flexibility", 
            footerLabel: 'Recommended',
            imageSrc: Password
        }, {
            label: "Ion", 
            value: "ion", 
            description: "Better for enhanced functionality", 
            disabled: true, 
            footerLabel: 'Not yet available',
            imageSrc: Lock
        }
    ]} 
    name={"didType"} 
    legend={"What kind of D-ID do you want to create?"} 
    itemsPerRow={3}
    handleEvent={(e) => setDidMethod(e.currentTarget.value as DIDMethod)}
/>

{ didMethod() === DIDMethodOptions[1] && 
    <TextInput 
        handleEvent={(e) => {setDidWebID(e.currentTarget.value)}} 
        name={"webID"} 
        label={"Website URL"} 
        placeholder={"example.com"}
    />
} */}