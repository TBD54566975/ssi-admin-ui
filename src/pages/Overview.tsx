import { Component, For } from 'solid-js';
import "./_overview.css";
import Icon from '../icons/Icon';
import { Link } from '@solidjs/router';

const pageTitle = 'Overview';

const cardItems = [
    {
        label: 'Design a Credential',
        url: '/credentials',
        description: 'Start building'
    },
    {
        label: 'Accept Credentials',
        url: '/verification',
        description: 'Define criteria'
    },
    {
        label: 'Automate Issuance',
        url: '/issuing',
        description: 'Simplify workflow'
    },
]

const Overview: Component = () => {
    return (
            <article>
                <div class="overview-container">
                    <div class="inner-content">
                        <h1>{pageTitle}</h1>
                        <div class="card-group">
                            <For each={cardItems}>
                                {(item) => 
                                    <Link class="card-contain" href={item.url}> 
                                        <div>
                                            <div class="card-icon">
                                                <Icon name={'plus'} />
                                            </div>
                                            <p>{item.label}</p>
                                            <p class="link-with-icon">{item.description} <Icon name={"arrow-long-right"} /></p>
                                        </div>
                                    </Link>
                                }
                            </For>
                        </div>
                    </div>
                </div>
            </article>
    )
}

export default Overview;