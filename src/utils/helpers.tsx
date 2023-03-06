import QRCode from 'qrcode'

export function generateQR(text: string, qrCanvas: HTMLCanvasElement | undefined) {
    QRCode.toCanvas(qrCanvas, text, function (error) {
        if (error) {
            console.error(error)
        }
    });
}


export function copyToClipboard(text: string, copyButton: HTMLButtonElement | undefined) {
    navigator.clipboard.writeText(text).then(res => {
        updateCopyText(copyButton)
    });
}

export function updateCopyText(copyButton: HTMLButtonElement | undefined) {
    if (copyButton && copyButton.innerText === 'Copy') {
        copyButton.innerText = 'Copied!';
        copyButton.classList.add('btn-opaque');
        setTimeout(() => {
            if (copyButton && copyButton.innerText === 'Copied!') {
                copyButton.classList.remove('btn-opaque');
            }
        }, 2000);
    }
}

export function resetCopyText(copyButton: HTMLButtonElement | undefined) {
    if(copyButton) {
        if (!copyButton.classList.contains('btn-opaque'))
        copyButton.innerText = 'Copy';
    }
}

export function formatJSON(object: any) {
    return JSON.stringify(object, null, 4);
}