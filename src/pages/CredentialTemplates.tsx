import type { Component } from 'solid-js';
import NavSidebar from '../components/NavSidebar';
import { routesForSidebar } from '../routes/routes';

const pageTitle = 'Credential Templates';

const navItems = [
    {
        path: '/credential-templates', 
        title: 'All Templates'
    }, {
        path: '/credential-templates/create-credential-template', 
        title: 'Create Template'
    }
]


const CredentialTemplates: Component = () => {
    return (
        <article>
            <NavSidebar navItems={routesForSidebar['credentials']['children']}/>
            <div class="inner-content">
                <h1>{pageTitle}</h1>
            </div>
        </article>
    )
}

export default CredentialTemplates;