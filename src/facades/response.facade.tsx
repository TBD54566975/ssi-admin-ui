const baseUrl = `/v1/manifests/responses/`;

export const getResponses = async () => {
    const res = await fetch(`${baseUrl}/`);
    return res.json();
}

export const deleteResponse = async (responseId: string) => {
    const res = await fetch(`${baseUrl}/${responseId}`, {
        method: 'DELETE'
    });
    return res.json();
}

export const getResponse = async (responseId: string) => {
    const res = await fetch(`${baseUrl}/${responseId}`);
    return res.json();
}