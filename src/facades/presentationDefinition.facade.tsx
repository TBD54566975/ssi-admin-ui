const baseUrl = `/v1/presentation/definitions`;

interface PresentationOptions {
    author: string,
    format?: { 
        jwt: string, 
        jwt_vp: string, 
        ldp: string, 
        ldp_vp: string 
    },
    inputDescriptors: unknown,
    name?: string,
    purpose?: string,
    submissionRequirements?: unknown
}

export const createPresentationDefinition = async(options: PresentationOptions) => {
    const res = await fetch(`${baseUrl}`, 
    {
        method: 'PUT',
        body: JSON.stringify(options)
    });
    return res.json();
}

export const deletePresentationDefinition = async (presentationId: string) => {
    const res = await fetch(`${baseUrl}/${presentationId}`, 
    {
        method: 'DELETE'
    });
    return res.json();
}

export const getPresentationDefinition = async (presentationId: string) => {
    const res = await fetch(`${baseUrl}/${presentationId}`);
    return res.json();
}

export const listPresentationDefinition = async () => {
    const res = await fetch(`${baseUrl}`);
    return res.json();
}