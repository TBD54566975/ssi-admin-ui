import type { Component } from 'solid-js';
import NavSidebar from '../components/NavSidebar';

const pageTitle = 'Credential Templates';

const CredentialTemplates: Component = () => {
    return (
        <article>
            <NavSidebar navItems={[{path: '/credential-templates', title: 'All Templates'}, {path: '/credential-templates/create-credential-template', title: 'Create Template'}]}/>
            <div class="inner-content">
                <h1>{pageTitle}</h1>
            </div>
        </article>
    )
}

export default CredentialTemplates;