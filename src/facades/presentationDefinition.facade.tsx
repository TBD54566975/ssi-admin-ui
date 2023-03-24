const baseUrl = `/v1/presentations/definitions`;

interface PresentationOptions {
    author: string,
    format?: { 
        jwt?: {
            alg: string[]
        }, 
        jwt_vp?: {
            alg: string[]
        }, 
        ldp?: {
            alg: string[]
        }, 
        ldp_vp?: {
            alg: string[]
        } 
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

export const getPresentationDefinitions = async () => {
    const res = await fetch(`${baseUrl}`);
    return res.json();
}