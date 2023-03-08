import type { Component } from 'solid-js';
import NavSidebar from '../components/NavSidebar';
import Table from '../composables/Table';
import TextSample from '../composables/TextSample';
import { mockCredential } from '../mocks/credentialJson';
import { mockSchemaResponse } from '../mocks/schemaJson';

const pageTitle = 'Credentials';

const Credentials: Component = (props) => {
    return (
        <article>
            <NavSidebar navItems={[{path: '/credentials', title: 'All Credentials'}, {path: '/credentials/issue-credential', title: 'Issue a Credential'}]}/>
            <div class="inner-content">
                <h1>{pageTitle}</h1>
                <div>
                    <h3>All DIDs</h3>
                    <Table data={[{'id': <TextSample textToDisplay={mockCredential.credential.id} />, 'Name': mockSchemaResponse.schema.schema.description }]} />
                </div>
            </div>
        </article>
    )
}

export default Credentials;