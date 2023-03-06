import { Component, createSignal, For, Match, Switch } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import NavSidebar from '../components/NavSidebar';
import Checkbox from '../composables/Checkbox';
import GroupInput from '../composables/GroupInput';
import Select from '../composables/Select';
import Table from '../composables/Table';
import TextArea from '../composables/TextArea';
import TextInput from '../composables/TextInput';
import Icon from '../icons/Icon';
import { mockDID } from '../mocks/didJson';
import { mockSchemaResponse } from '../mocks/schemaJson';
import { formatJSON } from '../utils/helpers';
import "./_schemas.css";

const pageTitle = 'Schemas';

const Schemas: Component = () => {
    let outputModal: any;

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