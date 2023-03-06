const baseUrl = `/v1/credentials`;

interface CredentialFilters {
    issuer?: string,
    schema?: string,
    subject?: string
}

interface CredentialOptions {
    data: unknown, 
    expiry?: string, 
    issuer: string, 
    revocable?: boolean, 
    schema?: string, 
    subject: string, 
    suspendable?: boolean
}

interface CredentialStatusOptions {
    revoked?: boolean, 
    suspended?: boolean
}

interface CredentialVerificationOptions {
    credential?: unknown, 
    credentialJWT?: string
}

const transformToQueryParams = (filters: CredentialFilters): string => {
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

export const getCredentials = async (filterBy: CredentialFilters) => {
    const res = await fetch(`${baseUrl}?${transformToQueryParams(filterBy)}`);
    return res.json();
}

export const createCredential = async (options: CredentialOptions) => {
    const res = await fetch(`${baseUrl}`, {
        method: 'PUT',
        body: JSON.stringify(options)
    });
    return res.json();
}

export const deleteCredential = async (credentialId: string) => {
    const res = await fetch(`${baseUrl}/${credentialId}`, {
        method: 'DELETE'
    });
    return res.json();
}

export const getCredential = async (credentialId: string) => {
    const res = await fetch(`${baseUrl}/${credentialId}`);
    return res.json();
}

export const getCredentialStatus = async (credentialId: string) => {
    const res = await fetch(`${baseUrl}/${credentialId}/status`);
    return res.json();
}

export const updateCredentialStatus = async (credentialId: string, statusOptions: CredentialStatusOptions) => {
    const res = await fetch(`${baseUrl}/${credentialId}`, {
        method: 'PUT',
        body: JSON.stringify(statusOptions)
    });
    return res.json();
}

export const getCredentialStatusList = async (credentialId: string) => {
    const res = await fetch(`${baseUrl}/status/${credentialId}`);
    return res.json();
}

export const verifyCredential = async (verificationOptions: CredentialVerificationOptions) => {
    const res = await fetch(`${baseUrl}`, {
        method: 'PUT',
        body: JSON.stringify(verificationOptions)
    });
    return res.json();
}