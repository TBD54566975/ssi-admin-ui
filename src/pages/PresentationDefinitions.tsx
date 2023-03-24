import type { Component } from 'solid-js';
import Dialog from '../containers/Dialog';
import CreateCriteria from './CreateCriteria';

const PresentationDefinitions: Component = (props) => {
    return (
        <article class="credentials-container">
        <div class="inner-content">
            <div class="table-header">
                <h1>Verification</h1>
                <Dialog ctaText={"Add Presentation Definition"}>
                    <div style={{margin: "auto"}}><h2>Presentation Definition</h2><CreateCriteria /></div>
                </Dialog>
            </div>
            <div class="container-fallback">
                You haven't added any Presentation Definitions yet.
            </div> 
        </div>
    </article>
    )
}

export default PresentationDefinitions;