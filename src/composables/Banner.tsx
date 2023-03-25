import { Component } from "solid-js";
import Icon, { IconName } from "../icons/Icon";
import "./_banner.css";

const bannerIconMap: Record<string, { iconName: IconName, heading: string }> = {
    "warn": {
        iconName: "exclamation-triangle",
        heading: "Caution"
    },
    "danger": {
        iconName: "shield-exclamation",
        heading: "Error"
    },
    "info": {
        iconName: "exclamation-circle",
        heading: "Important"
    },
    "success": {
        iconName: "exclamation-circle",
        heading: "Success"
    }
}

const Banner: Component<{type: 'warn' | 'danger' | 'info' | 'success', message: string}> = (props) => {
    return (
        <figure class={`alert-banner alert-${props.type}`}>
            <figcaption>
                <Icon name={bannerIconMap[props.type].iconName}/>
            </figcaption>
            <div>
                <p><strong>{bannerIconMap[props.type].heading}</strong></p>
                <p>{props.message}</p>
            </div>
        </figure>
    )
}

export default Banner;