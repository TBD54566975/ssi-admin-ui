import { Component } from 'solid-js';
import NavSidebar from '../components/NavSidebar';
import Table from '../composables/Table';
import { mockSchemaResponse } from '../mocks/schemaJson';
import "./_schemas.css";

const pageTitle = 'Schemas';

const Schemas: Component = () => {

    return (
        <article>
            <NavSidebar navItems={[{path: '/schemas', title: 'All Schemas'}, {path: '/schemas/create-schema', title: 'Create a Schema'}]}/>
            <div class="inner-content">
                <h1>{pageTitle}</h1>
                <Table data={[{
                    'name': mockSchemaResponse.schema.name, 
                    'description': mockSchemaResponse.schema.schema.description,
                    'id': mockSchemaResponse.id
                }]} />
            </div>
        </article>
    )
}

export default Schemas;