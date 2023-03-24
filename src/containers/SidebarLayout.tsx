import { Component, JSX } from "solid-js";
import Stepfinder from "../composables/Stepfinder";
import "./_sidebarLayout.css";

interface SidebarLayoutProps {
    children?: JSX.Element, 
    sidebarSteps: { 
        label: string, 
        active: boolean, 
        completed?: boolean
    }[]
}

const SidebarLayout: Component<SidebarLayoutProps> = (props) => {
    return (
        <div class="sidebar-layout">
            <aside>
                <Stepfinder steps={ props.sidebarSteps } />
            </aside>
            <section>
                <div class="inner-section">
                    { props.children }
                </div>
            </section>
        </div>
    )
}

export default SidebarLayout;