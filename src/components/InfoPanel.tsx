import { Component } from 'solid-js';
import './_infoPanel.css';
import TextSample from '../composables/TextSample';

const content = {
    title: 'Share your Decentralized ID',
    body: 'Copy your DID and use it to identify yourself anywhere within the Verifiable Credentials ecosystem.'
}

const InfoPanel: Component<{did: string}> = (props) => {

    return (
        <aside class="info-panel">
            <div>
                <div>
                    <h2 class="overline">Quick Access</h2>
                    <h3>{content.title}</h3>
                    <p>{content.body}</p>
                </div>
                <div>
                    <div>
                        <h4>DID</h4>
                        <TextSample textToDisplay={props.did} />
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default InfoPanel;