import { Component, createSignal, Match, Switch } from 'solid-js';
import CreateDID from '../components/CreateDID';
import NavSidebar from '../components/NavSidebar';
import OutputSample from '../composables/OutputSample';
import QRCode from '../composables/QRCode';
import Table from '../composables/Table';
import TextSample from '../composables/TextSample';
import Dialog from '../containers/Dialog';
import Icon from '../icons/Icon';
import { getDIDAtPosition, getStoreDIDs } from '../stores/store';
import { formatJSON } from '../utils/helpers';
import './_decentralizedIDs.css';

// const action  = (index: number, outputModal: HTMLDialogElement | undefined) =>  
// <div>
//     <menu>
//         <li>
//             <a href="#" onclick={() => {if (outputModal) outputModal.showModal()}}>
//                 View
//             </a>
//         </li>
//         <li>
//             <a href="#">
//                 Export
//             </a>
//         </li>
//     </menu>
//     <dialog ref={outputModal}>
//         <div>
//             <button onclick={() => outputModal?.close()}>
//                 <Icon name="close"></Icon>
//             </button>
//         </div>
//         {getDIDAtPosition(index) && 
//         <div>
//             <OutputSample codeToDisplay={formatJSON(getDIDAtPosition(index))} downloadFile="#"></OutputSample>
//             <QRCode stringToGenerate={JSON.stringify(getDIDAtPosition(index))} />
//         </div>
//         }
//     </dialog>
// </div>

const DecentralizedIDs: Component = () => {
    const navItems = [
        {path: '/d-id', title: 'DIDs'}, 
        {path: '/d-id/new', title: 'Create DID'},
        {path: '/d-id/import', title: 'Import DID'},
        {path: '/d-id/resolve-did', title: 'Resolve a DID'}
    ]

    let outputModal: HTMLDialogElement | undefined;

    const [verified, setVerified] = createSignal(false);


    return (
        <article class="credentials-container">
            <div class="inner-content">
                <div class="table-header">
                    <h1>DIDs</h1>
                    <Dialog ctaText={"Create DID"}>
                        <CreateDID />
                    </Dialog>
                </div>
                <Switch>
                    <Match when={!getStoreDIDs().length}>
                        <div class="container-fallback">
                            No DIDs to display
                        </div>
                    </Match>
                    <Match when={getStoreDIDs().length}>
                        <Table ariaLabelledBy={'DIDs'} data={
                            getStoreDIDs()?.map((document, index) => { 
                                return {
                                    'id': document.id,
                                }
                            })
                        } />
                    </Match>
                </Switch>
            </div>
        </article>
    )
}

export default DecentralizedIDs;