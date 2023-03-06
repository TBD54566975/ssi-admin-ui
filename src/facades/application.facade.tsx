const baseUrl = `/v1/manifests/applications`;

interface ApplicationOptions {
    approved?: boolean, 
    credentialOverrides?: unknown, 
    reason?: string
}

export const getApplications = async () => {
    const res = await fetch(`${baseUrl}`);
    return res.json(); 
}

export const deleteApplication = async (applicationId: string) => {
    const res = await fetch(`${baseUrl}/${applicationId}`,
    {
        method: `DELETE`
    });
    return res.json(); 
}

export const getApplication = async (applicationId: string) => {
    const res = await fetch(`${baseUrl}/${applicationId}`);
    return res.json(); 
}

export const reviewApplication = async (applicationId: string, options: ApplicationOptions) => {
    const res = await fetch(`${baseUrl}/${applicationId}/review`,
    {
        method: `PUT`,
        body: JSON.stringify(options)
    });
    return res.json(); 
}