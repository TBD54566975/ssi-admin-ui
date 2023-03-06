const baseUrl = `/v1/issuancetemplates`;

interface IssuanceTemplateOptions {
    credentialManifest: string, 
    credentials?: unknown, 
    id?: string, 
    issuer: string
}

export const createIssuanceTemplate = async (options: IssuanceTemplateOptions) => {
    const res = await fetch(`${baseUrl}`, {
        method: 'PUT',
        body: JSON.stringify(options)
    });
    return res.json();
}

export const deleteIssuanceTemplate = async (templateId: string) => {
    const res = await fetch(`${baseUrl}/${templateId}`, {
        method: 'DELETE'
    });
    return res.json();
}

export const getIssuanceTemplate = async (templateId: string) => {
    const res = await fetch(`${baseUrl}/${templateId}`);
    return res.json();
}