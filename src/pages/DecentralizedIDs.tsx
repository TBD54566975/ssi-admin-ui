import { Component } from 'solid-js';
import NavSidebar from '../components/NavSidebar';
import OutputSample from '../composables/OutputSample';
import QRCode from '../composables/QRCode';
import Table from '../composables/Table';
import TextSample from '../composables/TextSample';
import Icon from '../icons/Icon';
import { getDIDAtPosition } from '../stores/store';
import { formatJSON } from '../utils/helpers';
import './_decentralizedIDs.css';

const pageTitle = 'Decentralized IDs';

const DecentralizedIDs: Component = () => {
    let outputModal: HTMLDialogElement | undefined;
    const action = (
        <>
            <menu>
                <li>
                    <a href="#" onclick={() => {if (outputModal) outputModal.showModal()}}>
                        View
                    </a>
                </li>
                <li>
                    <a href="#">
                        Export
                    </a>
                </li>
            </menu>
            <dialog ref={outputModal}>
                <div>
                    <button onclick={() => outputModal?.close()}>
                        <Icon name="close"></Icon>
                    </button>
                </div>
                {getDIDAtPosition(0) && 
                <div>
                    <OutputSample codeToDisplay={formatJSON(getDIDAtPosition(0))} downloadFile="#"></OutputSample>
                    <QRCode stringToGenerate={JSON.stringify(getDIDAtPosition(0))} />
                </div>
                }
            </dialog>
        </>
    )

    return (
        <article>
            <NavSidebar navItems={[{path: '/decentralized-identities', title: 'DIDs'}, {path: '/decentralized-identities/resolve-did', title: 'Resolve a DID'}]}/>
            <div class="inner-content">
                <h1>{pageTitle}</h1>
                <div>
                    <h3>All DIDs</h3>
                    <Table data={[{'id': <TextSample textToDisplay={getDIDAtPosition(0)?.id} />, 'actions': action}]} />
                </div>
            </div>
        </article>
    )
}

export default DecentralizedIDs;