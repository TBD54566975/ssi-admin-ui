import { Component, createEffect, createSignal, For, JSX, Match, Show, Switch } from "solid-js";
import NavSidebar from "../components/NavSidebar";
import Select from "../composables/Select";
import Table from "../composables/Table";
import TextArea from "../composables/TextArea";
import TextInput from "../composables/TextInput";
import Dialog from "../containers/Dialog";
import SidebarLayout from "../containers/SidebarLayout";
import { createManifest, getManifests } from "../facades/manifest.facade";
import { createPresentationDefinition } from "../facades/presentationDefinition.facade";
import { createSchema, getSchemas } from "../facades/schema.facade";
import Icon from "../icons/Icon";
import { mockSchemaResponse } from "../mocks/schemaJson";
import { getDIDAtPosition, getStoreManifests, setStoreManifests } from "../stores/store";
import { formatJSON } from "../utils/helpers";
import CreateCriteria from "./CreateCriteria";
import CreateSchema from "./CreateSchema";
import "./_credentials.css";



const FormButtonGroup: Component<{handleBack?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined, handleSubmit?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined, showBack?: boolean, showCta?: boolean, backText?: string, ctaText?: string}> = (props) => {
    return (
        <div class="btn-container-flex">
            <Show when={props.showBack}>
                <button 
                    onclick={props.handleBack} 
                    class="btn btn-outline"
                >
                    { props.backText || 'Back' }
                </button>
            </Show>
            <Show when={props.showCta}>
                <button 
                    id="submit-btn"
                    type="submit"
                    class="btn btn-primary"
                    onclick={props.handleSubmit}
                >
                    { props.ctaText || 'Next' }
                </button>
            </Show>
        </div>
    )
}

const FormGroup: Component<{handleChange?: JSX.EventHandlerUnion<HTMLFormElement, Event> | undefined, handleSubmit?: JSX.EventHandlerUnion<HTMLFormElement, Event & { submitter: HTMLElement; }> | undefined, handleBack?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined, children: JSX.Element}> = (props) => {
    return (
        <form onsubmit={props.handleSubmit} autocomplete="off" onchange={props.handleChange}>
            {props.children}
            <FormButtonGroup 
                handleBack={props.handleBack}
                showBack
                showCta
            />
        </form>
    )
}

function getDisplayProperties(schema: { properties?: unknown }) {
    if (schema.properties) {
        const schemaProperties = Object.entries(schema.properties);
        const schemaMap: Array<{label: string, path: string[], schema: string, fallback: string}> | any = schemaProperties.map(property => {
            if (RegExp(/string|number|boolean/).test(property[1].type)) {
                const result = {
                    label: property[0],
                    path: [`$.${property[0]}`, `$.vc.${property[0]}`],
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

const CreateCredential: Component = () => {
    const [ schemas, setSchemas ] = createSignal([]);

    const [ schemaProps, setSchemaProps ] = createSignal({});

    function transformSchema(schema: typeof thing['schema']) {
        let result;

        result = {
            author: getDIDAtPosition(0).id,
            name: schema.schemaName,
            schema: {
                properties: schema.properties
            }
        }
        return result
    }

    function transformCriteria(criteria: typeof thing['criteria']) {
        let result;

        result = {
            author: getDIDAtPosition(0).id,
            format: {
                jwt_vp: {
                    alg: ["EdDSA"]
                }
            },
            inputDescriptors: criteria.properties.input_descriptors.map((input, index) => { return { ...input, id: index.toString() }}),
            name: criteria.criteriaName,
            purpose: criteria.criteriaPurpose
        }
        return result;
    }

    function transformEntry(entry: typeof thing, schemaID: string, presentationDefinition?: {id: string, input_descriptors: { [k: string]: string }[]} ): Submit {
        let result;

        result = {
            description: entry.credentialDescription,
            format: {
                jwt_vc: {
                    alg: ["EdDSA"]
                }
            },
            issuerDid: getDIDAtPosition(0).id,
            name: entry.credentialName,
            outputDescriptors: [
                {
                    description: entry.credentialDescription,
                    display: {
                        description: {
                            text: entry.description
                        },
                        properties: JSON.parse(entry.properties),
                        subtitle: {
                            text: entry.subtitle
                        },
                        title: {
                            text: entry.title
                        }
                    },
                    id: "0",
                    name: entry.credentialName,
                    schema: schemaID,
                    styles: {
                        background: {
                            color: entry.backgroundColor
                        },
                        hero: {
                            alt: entry["hero-alt"],
                            uri: entry.hero
                        },
                        text: {
                            color: entry.textColor
                        },
                        thumbnail: {
                            alt: entry["thumbnail-alt"],
                            uri: entry.thumbnail
                        }
                    }
                },
            ],
            ...presentationDefinition && { presentationDefinition }

        }
        return result;
    }

    const thing = {
        "credentialName": "Employed",
        "credentialDescription": "Descript",
        "schema": {
            "schemaName": "SChemanmae",
            "editorView": "richEditor",
            "propertyName-0": "firstname",
            "propertyType-0": "string",
            "properties": {
                "firstname": {
                    "type": "string"
                }
            }
        },
        "criteria": {
            "criteriaName": "critrera",
            "criteriaPurpose": "purposeofcrtier",
            "properties": {
                "input_descriptors": [
                    {
                        "id": "",
                        "constraints": {
                            "fields": [
                                {
                                    "path": [
                                        "$.vc.firstName"
                                    ]
                                }
                            ]
                        }
                    }
                ]
            }
        },
        "title": "Employed",
        "subtitle": "SChemanmae",
        "description": "Descript",
        "properties": "[\n    {\n        \"label\": \"firstname\",\n        \"path\": [\n            \"$.firstname\",\n            \"$.vc.firstname\"\n        ],\n        \"schema\": {\n            \"type\": \"string\"\n        },\n        \"fallback\": \"\"\n    }\n]",
        "background": "#1A1A1A",
        "backgroundColor": "#1a1a1a",
        "text": "#F8E74F",
        "textColor": "#f8e74f",
        "hero": "https://www.tbd.website/images/home-glitch-bottom-desktop-dark.svg",
        "hero-alt": "dasdasda",
        "thumbnail": "https://developer.tbd.website/img/tbd-logo.svg",
        "thumbnail-alt": "adadada"
    }

    interface Submit {
        description?: string,
        format: {
            [k: string]: {
                alg: string[]
            }
        },
        issuerDid: string,
        issuerName?: string,
        name?: string,
        outputDescriptors: {
                description?: string,
                display?: {
                    description?: {
                        fallback?: string,
                        path?: string[],
                        schema?: {
                            format?: string,
                            type: string
                        },
                        text?: string
                    },
                    properties?: {
                            fallback?: string,
                            path?: string[],
                            schema?: {
                                format?: string,
                                type: string
                            },
                            text?: string
                    }[],
                    subtitle?: {
                        fallback?: string,
                        path?: string[],
                        schema?: {
                            format?: string,
                            type: string
                        },
                        text?: string
                    },
                    title?: {
                        fallback?: string,
                        path?: string[],
                        schema?: {
                            format?: string,
                            type: string
                        },
                        text?: string
                    }
                },
                id: string,
                name?: string,
                schema: string,
                styles?: {
                    background?: {
                        color?: string
                    },
                    hero?: {
                        alt?: string,
                        uri: string
                    },
                    text?: {
                        color?: string
                    },
                    thumbnail?: {
                        alt?: string,
                        uri: string
                    },
                }
        }[],
        presentationDefinition?: {
            id: string,
            input_descriptors: {
                [k: string]: string
            }[]
        }
    }

    interface Manifest {
        name: string,
        description: string,
        outputDescriptors: [
            {
                description: string,
                display: {
                    description: {
                        text: string
                    },
                    title: {
                        text: string
                    },
                    subtitle: {
                        text: string
                    },
                    properties: [
                        {
                            label: string,
                            path: string[],
                            schema: {
                                format: {
                                    [k: string]: string
                                },
                                type: string
                            },
                            fallback: string,
                            text: string
                        }
                    ]
                },
                id: string,
                schema: string,
                name: string,
                styles: {
                    background: {
                        color: string
                    },
                    text: {
                        color: string
                    },
                    hero: {
                        alt: string,
                        uri: string
                    },
                    thumbnail: {
                        alt: string,
                        uri: string
                    }
                }
            }
        ],
        presentationDefinition: {
            [k: string]: any
        }
    }

    getSchemas().then(res => {
        setSchemas(res.schemas);
        // setSelectedSchema(res.schemas[0]);
        // setSchemaProps(res.schemas[0].schema.schema);
    });

    const steps = [
        {
            label: 'Name',
            description: 'Give your Credential a name'
        },
        {
            label: 'Description',
            description: 'Describe the purpose of your Credential'
        },
        {
            label: 'Properties',
            description: 'Define properties for the Credential'
        },
        {
            label: 'Criteria',
            description: 'Define the criteria for applying for this Credential'
        },
        {
            label: 'Display',
            description: 'Define which properties to display'
        },
        {
            label: 'Style',
            description: 'Set styles for your credential'
        }
    ];

    const [ currentStep, setCurrentStep ] = createSignal<{label: string, description: string}>(steps[0]);

    const closeModal = () => {
        document.querySelector('dialog')?.close();
        document.body.classList.remove('p-fixed');
    }

    const [formValues, setFormValues] = createSignal({});

    function handleSubmit(event: Event & { submitter: HTMLElement; } & { currentTarget: HTMLFormElement; target: Element; }) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = {};
    
        for (const [ key, value ] of formData) {
          (data as any)[key] = value;
        }

        if (currentStep() === steps[2] || currentStep() === steps[3]) {
            let propName = currentStep() === steps[2] ? 'schema' : 'criteria';

            saveModelData(data as { [k: string]: any;}, propName);

            if (propName === 'schema') {
                setSchemaProps((formValues() as any)['schema']);
            } else {
                blankCredential.title = (formValues() as any)?.['credentialName'];
                blankCredential.subtitle = (formValues() as any)?.['schema']?.['schemaName'];
                blankCredential.description = (formValues() as any)?.['credentialDescription'];
            }
        } else {
            setFormValues((prevValues) => ({ ...prevValues, ...data }));
        }
        handleNext();
    }

    function handleNext() {
        if (currentStep() !== steps[steps.length - 1]) {
            setCurrentStep(steps[steps.indexOf(currentStep()) + 1])
        } else {

            const schema = transformSchema((formValues() as any)['schema']);
            const criteria = transformCriteria((formValues() as any)['criteria']);

            Promise.all([
                createSchema(schema), 
                createPresentationDefinition(criteria)
            ]).then(res => {
                const result = {
                    schemaID: res[0].id,
                    presentationDefinition: res[1].presentation_definition
                }
                const entry = transformEntry((formValues() as any), result.schemaID, result.presentationDefinition);
                return createManifest(entry);
            }).then(res => {
                if (res.credential_manifest) {
                    setStoreManifests([res]);
                }
            }).catch(e => console.error(e));

            closeModal();
        }
    }

    function handleBack() {
        if (currentStep() !== steps[0]) {
            setCurrentStep(steps[steps.indexOf(currentStep()) - 1])
        } else {
            closeModal();
        }
    }

    function saveModelData(data: { [k: string]: any }, propName: string) {
        const { properties, ...modelData } = data;
    
        setFormValues((prevValues) => ({ 
            ...prevValues, 
            [propName]: {
                ...modelData,
                properties: JSON.parse(properties),
            } 
        }));

    }

    const blankCredential = {
        title: "Title",
        subtitle: "Subtitle",
        description: "Description",
        properties: getDisplayProperties(schemaProps() as any),
        hero: "",
        heroAlt: "",
        thumbnail: "",
        thumbnailAlt: "",
        backgroundColor: "#1A1A1A",
        textColor: "#F8E74F"
    }

    function isValidHexColor(hexColor: string) {
        if (!hexColor.startsWith('#')) {
          return false;
        }
        const hexValue = hexColor.slice(1);
        return RegExp(/^[0-9A-Fa-f]{6}$/).test(hexValue);
    }

    const [ credentialData, setCredentialData ] = createSignal(blankCredential);


    return (
        <SidebarLayout sidebarSteps={            
            steps.map((step, index) => { 
                return {
                    label: step.label, 
                    active: step === currentStep(), 
                    completed:  index < steps.indexOf(currentStep())
                }
            })
        }>
            <div class="credential-form">
                <div class="credential-form-content">
                    <h2>{currentStep().label}</h2>
                    <p>{currentStep().description}</p>
                    <Switch>
                        <Match when={currentStep() === steps[0]}>
                            <FormGroup handleBack={handleBack} handleSubmit={handleSubmit}>
                                <div>
                                    <TextInput 
                                        label={"Name"} 
                                        name={"credentialName"} 
                                        placeholder={"My Awesome Credential"}
                                        value={(formValues() as any)['credentialName']}/>
                                </div>
                            </FormGroup>
                        </Match>
                        <Match when={currentStep() === steps[1]}>
                            <FormGroup handleBack={handleBack} handleSubmit={handleSubmit}>
                                <div>
                                    <TextInput 
                                        label={"Description"} 
                                        name={"credentialDescription"} 
                                        placeholder={"An awesome Verifiable Credential"}
                                        value={(formValues() as any)['credentialDescription']}/>
                                </div>
                            </FormGroup>
                        </Match>
                        <Match when={currentStep() === steps[2]}>
                            <FormGroup handleBack={handleBack} handleSubmit={handleSubmit}>
                                <CreateSchema 
                                    schemas={schemas()} 
                                    handleChange={(e) => {
                                        setSchemaProps(e.schema.schema);
                                    }}
                                    formValues={(formValues() as any)['schema']}
                                    schemaProps={schemaProps()}
                                />
                            </FormGroup>
                        </Match>
                        <Match when={currentStep() === steps[3]}>
                            <FormGroup handleBack={handleBack} handleSubmit={handleSubmit}>
                                <CreateCriteria 
                                    formValues={(formValues() as any)['criteria']}
                                />
                            </FormGroup>
                        </Match>
                        <Match when={currentStep() === steps[4]}>
                            <FormGroup handleBack={handleBack} handleSubmit={handleSubmit}>
                                <div>
                                    <TextInput 
                                        label={"Title"} 
                                        name={"title"} 
                                        placeholder={"Title of the Credential"}
                                        handleKeyup={(e) => {
                                            setCredentialData((prevValues) => ({ ...prevValues, title: e.currentTarget.value }))
                                        }}
                                        value={credentialData()['title']}/>
                                </div>
                                <div>
                                    <TextInput 
                                        label={"Subtitle"} 
                                        name={"subtitle"} 
                                        placeholder={"Subtitle of the Credential"}
                                        handleKeyup={(e) => {
                                            setCredentialData((prevValues) => ({ ...prevValues, subtitle: e.currentTarget.value }))
                                        }}
                                        value={credentialData()['subtitle']}/>
                                </div>
                                <div>
                                    <TextInput 
                                        label={"Description"} 
                                        name={"description"} 
                                        placeholder={"Description of the Credential"}
                                        handleKeyup={(e) => {
                                            setCredentialData((prevValues) => ({ ...prevValues, description: e.currentTarget.value }))
                                        }}
                                        value={credentialData()['description']}/>
                                </div>
                                <div>
                                    <TextArea 
                                        label={"Properties"} 
                                        name={"properties"}
                                        handleKeyup={(e) => {
                                            setCredentialData((prevValues) => ({ ...prevValues, properties: JSON.parse(e.currentTarget.value) }))
                                        }}
                                        >
                                        {formatJSON( credentialData().properties || getDisplayProperties(schemaProps() as any))}
                                    </TextArea>
                                </div>
                            </FormGroup>
                        </Match>
                        <Match when={currentStep() === steps[5]}>
                            <FormGroup handleBack={handleBack} handleSubmit={handleSubmit}>
                                <div class="color-input">
                                    <TextInput 
                                        description={"Only valid 6-character hexadecimal values are allowed eg. #FFFFFF"}
                                        handleEvent={(e) => {
                                        if (isValidHexColor(e.currentTarget.value)) {
                                            // setBackgroundColor(e.currentTarget.value)
                                            setCredentialData((prevValues) => ({ ...prevValues, backgroundColor: e.currentTarget.value }))
                                        } else {
                                            setCredentialData((prevValues) => ({ ...prevValues, backgroundColor: prevValues['backgroundColor'] }))
                                        }
                                        }} 
                                        label={"Background"} 
                                        name={"background"} 
                                        placeholder={credentialData()['backgroundColor']} 
                                        value={credentialData()['backgroundColor']}/>
                                    <input 
                                        oninput={(e) => setCredentialData((prevValues) => ({ ...prevValues, backgroundColor: e.currentTarget.value }))} 
                                        onchange={(e) => setCredentialData((prevValues) => ({ ...prevValues, backgroundColor: e.currentTarget.value }))} 
                                        type="color" 
                                        name="backgroundColor" 
                                        value={credentialData()['backgroundColor']}/>
                                </div>
                                <div class="color-input">
                                    <TextInput 
                                        description={"Only valid 6-character hexadecimal values are allowed eg. #FFFFFF"}
                                        handleEvent={(e) => {
                                        if (isValidHexColor(e.currentTarget.value)) {
                                            // setTextColor(e.currentTarget.value)
                                            setCredentialData((prevValues) => ({ ...prevValues, textColor: e.currentTarget.value }))
                                        } else {
                                            setCredentialData((prevValues) => ({ ...prevValues, textColor: prevValues['textColor'] }))
                                        }
                                    }} 
                                    label={"Text"} 
                                    name={"text"} 
                                    placeholder={credentialData()['textColor']} 
                                    value={credentialData()['textColor']}/>
                                    <input 
                                        oninput={(e) => setCredentialData((prevValues) => ({ ...prevValues, textColor: e.currentTarget.value }))} 
                                        onchange={(e) => setCredentialData((prevValues) => ({ ...prevValues, textColor: e.currentTarget.value }))} 
                                        type="color" 
                                        name="textColor" 
                                        value={credentialData()['textColor']}/>
                                </div>
                                <div>
                                    <TextInput 
                                        type="url"
                                        label={"Hero Image URL"} 
                                        name={"hero"} 
                                        placeholder={"https://www.example.com/path/to/imageUrl"}
                                        handleEvent={(e) => {
                                            setCredentialData((prevValues) => ({ ...prevValues, hero: e.currentTarget.value }))
                                        }}
                                        value={credentialData()['hero']}/>
                                    <TextInput 
                                        label={"Hero Image Alt Text"} 
                                        name={"hero-alt"} 
                                        placeholder={"Photo of smiling people walking outside on a sunny day"}
                                        handleEvent={(e) => {
                                            setCredentialData((prevValues) => ({ ...prevValues, heroAlt: e.currentTarget.value }))
                                        }}
                                        value={credentialData()['heroAlt']}/>
                                </div>
                                <div>
                                    <TextInput 
                                        type="url"
                                        label={"Thumbnail URL"} 
                                        name={"thumbnail"} 
                                        placeholder={"https://www.example.com/path/to/imageUrl"}
                                        handleEvent={(e) => {
                                            setCredentialData((prevValues) => ({ ...prevValues, thumbnail: e.currentTarget.value }))
                                        }}
                                        value={credentialData()['thumbnail']}/>
                                    <TextInput 
                                        label={"Thumbnail Alt Text"} 
                                        name={"thumbnail-alt"} 
                                        placeholder={"XYZ Enterprises Company Logo"}
                                        handleEvent={(e) => {
                                            setCredentialData((prevValues) => ({ ...prevValues, thumbnailAlt: e.currentTarget.value }))
                                        }}
                                        value={credentialData()['thumbnailAlt']}/>
                                </div>
                            </FormGroup>
                        </Match>
                    </Switch>
                </div>
                <Show when={currentStep() === steps[4] || currentStep() === steps[5]}>
                    <div class="secondary-sidebar">
                        <div class="credential-sidebar-inner">
                            <div class="credential-preview" style={{background: `${credentialData().backgroundColor}`, color: `${credentialData().textColor}`}}>
                                {credentialData().thumbnail && <div style={{"background-image": `url(${credentialData().thumbnail})`}} class="thumbnail credential-section" role="img" aria-label={credentialData().thumbnailAlt}></div>}
                                {credentialData().hero && <div style={{"background-image": `url(${credentialData().hero})`}} class="hero" role="img" aria-label={credentialData().heroAlt}></div>}
                                <div class="credential-section">
                                    <div class="title">{credentialData().title}</div>
                                    <div class="subtitle">{credentialData().subtitle}</div>
                                    <div class="description">{credentialData().description}</div>
                                    <div class="property-section">
                                        <For each={credentialData().properties || getDisplayProperties(schemaProps() as any)}>
                                            {(property) => 
                                            <div class="property-section-group">
                                                <div class="property-label">{property.label}</div>
                                                <div class="property-value">{`[${property.path.toString()}]`}</div>
                                            </div>
                                            }
                                        </For>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Show>
            </div>
        </SidebarLayout>
    )
}

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