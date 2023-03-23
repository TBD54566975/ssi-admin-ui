import { Component, For } from 'solid-js';
import Card from '../composables/Card';
import BitcoinSVG from "../assets/img/bitcoin.svg"
import SidebarLayout from '../containers/SidebarLayout';
import "./_overview.css";
import Icon from '../icons/Icon';
import { Link } from '@solidjs/router';
import NavSidebar from '../components/NavSidebar';

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

const navItems = [
    {path: '/credentials', title: '+ Design Credential'}
]

const Overview: Component = () => {
    return (
            <article>
                {/* <NavSidebar navItems={navItems}/> */}
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