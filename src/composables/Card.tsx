import { Link } from "@solidjs/router";
import { Component } from "solid-js";
import Icon from "../icons/Icon";
import "./_card.css";

const Card: Component<{heading: string, body: string, cta: string, img: string}> = (props) => {
    return (
        <div class="card-container">
            <div class="card-icon">
                <img src={props.img} alt=""/>
            </div>
            <h2>{props.heading}</h2>
            <p>{props.body}</p>
            <div>
                <Link href={"/schemas"} class="link-with-icon"> 
                    {props.cta}
                    <Icon name={"arrow-long-right"} />
                </Link>
            </div>
        </div>
    )
}

export default Card;