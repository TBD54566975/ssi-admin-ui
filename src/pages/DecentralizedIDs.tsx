import { Component, Match, Switch } from 'solid-js';
import CreateDID from '../components/CreateDID';
import Table from '../composables/Table';
import Dialog from '../containers/Dialog';
import { getStoreDIDs } from '../stores/store';

const DecentralizedIDs: Component = () => {

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
                            getStoreDIDs()?.map((document) => { 
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