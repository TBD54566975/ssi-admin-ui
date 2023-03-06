const baseUrl = `/v1/manifests`;

interface ManifestFilters {
    issuer?: string,
    schema?: string,
    subject?: string
}

interface ManifestOptions {
    description?: string, 
    format?: { 
        jwt: string, 
        jwt_vc: string, 
        ldp: string, 
        ldp_vc: string 
    }, 
    issuerDid: string, 
    issuerName?: string, 
    name?: string, 
    outputDescriptors: unknown, 
    presentationDefinition?: unknown
}

const transformToQueryParams = (filters: ManifestFilters): string => {
    const params = [];
    if (filters.issuer) {
        params.push(`issuer=${encodeURIComponent(filters.issuer)}`)
    };
    if (filters.schema) {
        params.push(`schema=${encodeURIComponent(filters.schema)}`)
    };
    if (filters.subject) {
        params.push(`subject=${encodeURIComponent(filters.subject)}`)
    };
    return params.join('&');
}

export const getManifests = async (filterBy: ManifestFilters) => {
    const res = await fetch(`${baseUrl}?${transformToQueryParams(filterBy)}`);
    return res.json();
}

export const createManifest = async (options: ManifestOptions) => {
    const res = await fetch(`${baseUrl}`, {
        method: 'PUT',
        body: JSON.stringify(options)
    });
    return res.json();
}

export const deleteManifest = async (manifestId: string) => {
    const res = await fetch(`${baseUrl}/${manifestId}`, {
        method: 'DELETE'
    });
    return res.json();
}

export const getManifest = async (manifestId: string) => {
    const res = await fetch(`${baseUrl}/${manifestId}`);
    return res.json();
}