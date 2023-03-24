import { Component } from 'solid-js';
import './_infoPanel.css';
import TextSample from './TextSample';

const InfoPanel: Component<{did: string}> = (props) => {
    return (
        <aside class="info-panel">
            <div>
                <div>
                    <h2 class="overline">Quick Access</h2>
                    <h3>Share your Decentralized ID</h3>
                    <p>Copy your DID and use it to identify yourself anywhere within the Verifiable Credentials ecosystem.</p>
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