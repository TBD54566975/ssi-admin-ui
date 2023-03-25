const baseUrl = `/v1/manifests`;

interface ManifestFilters {
    issuer?: string,
    schema?: string,
    subject?: string
}

export interface ManifestOptions {
    credential_manifest: {
        description?: string, 
        format?: { 
            jwt?: {
                alg: string[]
            }, 
            jwt_vc?: {
                alg: string[]
            }, 
            ldp?: {
                alg: string[]
            }, 
            ldp_vc?: {
                alg: string[]
            } 
        }, 
        issuerDid: string, 
        issuerName?: string, 
        name?: string, 
        output_descriptors: any[], 
        presentation_definition?: any
    }
}

export interface ManifestInputs {
    description?: string, 
    format?: { 
        jwt?: {
            alg: string[]
        }, 
        jwt_vc?: {
            alg: string[]
        }, 
        ldp?: {
            alg: string[]
        }, 
        ldp_vc?: {
            alg: string[]
        } 
    }, 
    issuerDid: string, 
    issuerName?: string, 
    name?: string, 
    outputDescriptors: any[], 
    presentationDefinition?: any
}

const transformToQueryParams = (filters: ManifestFilters): string => {
    const params = [];
    if (filters.issuer) {
        params.push(`issuer=${encodeURIComponent(filters.issuer)}`)
    }
    if (filters.schema) {
        params.push(`schema=${encodeURIComponent(filters.schema)}`)
    }
    if (filters.subject) {
        params.push(`subject=${encodeURIComponent(filters.subject)}`)
    }
    return params.join('&');
}

export const getManifests = async (filterBy?: ManifestFilters) => {
    let query = '';
    if (filterBy) {
        query = `?${transformToQueryParams(filterBy)}`
    }
    const res = await fetch(baseUrl + query);
    return res.json();
}

export const createManifest = async (options: ManifestInputs) => {
    const res = await fetch(baseUrl, {
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