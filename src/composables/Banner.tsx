import { Component, Match, Switch } from "solid-js";
import Icon from "../icons/Icon";
import "./_banner.css";

const Banner: Component<{type: 'warn' | 'danger' | 'info' | 'success', message: string}> = (props) => {
    return (
        <figure class="alert-banner" classList={{
            "alert-warn": props.type === 'warn', 
            "alert-danger": props.type === 'danger', 
            "alert-info": props.type === 'info', 
            "alert-success": props.type === 'success'
            }}>
            <figcaption>
                <Switch>
                    <Match when={props.type === 'warn'}>
                        <Icon name="exclamation-triangle" />
                    </Match>
                    <Match when={props.type === 'danger'}>
                        <Icon name="shield-exclamation" />
                    </Match>
                    <Match when={props.type === 'info'}>
                        <Icon name="exclamation-circle" />
                    </Match>
                    <Match when={props.type === 'success'}>
                        <Icon name="shield-check" />
                    </Match>
                </Switch>
            </figcaption>
            <p>{props.message}</p>
        </figure>
    )
}

export default Banner;