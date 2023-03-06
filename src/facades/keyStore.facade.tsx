const baseUrl = `/v1/keys`;

interface KeyStoreOptions {
    base58PrivateKey: string,
    controller: string,
    id: string,
    type: string
}

export const storeKey = async (options: KeyStoreOptions) => {
    const res = await fetch(`${baseUrl}`, {
        method: 'PUT',
        body: JSON.stringify(options)
    });
    return res.json();
}

export const revokeKey = async (keyId: string) => {
    const res = await fetch(`${baseUrl}/${keyId}`, {
        method: 'DELETE'
    });
    return res.json();
}

export const getDetailsForKey = async (keyId: string) => {
    const res = await fetch(`${baseUrl}/${keyId}`);
    return res.json();
}