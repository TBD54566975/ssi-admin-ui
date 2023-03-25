import { Component, onMount } from "solid-js";
import { generateQR } from "../utils/helpers";
import "./_qrCode.css";

const QRCode: Component<{stringToGenerate: string}> = (props) => {
    let qrCanvas: HTMLCanvasElement | undefined;
    onMount(() => {
        generateQR(props.stringToGenerate, qrCanvas);
    });
    return (
        <div>
            <h3>QR Code</h3>
            <div>
                <canvas ref={qrCanvas} class="qr-frame"></canvas>
            </div>
            <button class="btn btn-outline">Download QR Code</button>
        </div>
    )
}

export default QRCode;