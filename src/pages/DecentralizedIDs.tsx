import { Component, onMount } from 'solid-js';
import NavSidebar from '../components/NavSidebar';
import OutputSample from '../composables/OutputSample';
import QRCode from '../composables/QRCode';
import Select from '../composables/Select';
import Table from '../composables/Table';
import TextSample from '../composables/TextSample';
import Icon from '../icons/Icon';
import { mockDID } from '../mocks/didJson';
import { formatJSON, generateQR } from '../utils/helpers';
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
                <div>
                    <OutputSample codeToDisplay={formatJSON(mockDID)} downloadFile="#"></OutputSample>
                    <QRCode stringToGenerate={JSON.stringify(mockDID)} />
                </div>
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
                    <Table data={[{'id': <TextSample textToDisplay={mockDID.id} />, 'actions': action}]} />
                </div>
            </div>
        </article>
    )
}

export default DecentralizedIDs;