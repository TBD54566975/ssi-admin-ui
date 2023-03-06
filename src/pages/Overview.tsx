import type { Component } from 'solid-js';
import Card from '../composables/Card';
import BitcoinSVG from "../assets/img/bitcoin.svg"

const pageTitle = 'Overview';

const Overview: Component = () => {
    return (
        <article>
            <div>
                <h1>{pageTitle}</h1>
                <Card 
                    heading="Create a schema" 
                    body="Reuse sets of fields and requirements across multiple Credentials and Presentation documents" 
                    cta="Get started" 
                    img={BitcoinSVG}
                />
            </div>
        </article>
    )
}

export default Overview;