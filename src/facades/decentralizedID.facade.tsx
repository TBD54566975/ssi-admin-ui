const baseUrl = `/v1/dids`;

type DIDMethod = 'key' | 'web';

type DIDKeyType = 'Ed25519' | 'X25519' | 'secp256k1' | 'P-224' | 'P-256' | 'P-384' | 'P-521' | 'RSA';

interface DIDOptions {
    keyType: DIDKeyType, 
    didWebId?: string
}

export interface DIDDocument {
    '@context': any,
    alsoKnownAs?: string,
    assertionMethod: any[],
    authentication: any[],
    capabilityDelegation: any[],
    capabilityInvocation?: any[],
    controller?: string,
    id: string,
    keyAgreement: any[],
    service?: any[],
    verificationMethod: any[]
  }

export const getDIDMethods = async (): Promise<DIDMethod[]> => {
    const res = await fetch(`${baseUrl}`);
    return res.json();
}

export const getDIDs = async (method: DIDMethod): Promise<DIDDocument[]> => {
    const res = await fetch(`${baseUrl}/${method}`);
    return res.json();
}

export const createDID = async (method: DIDMethod, options: DIDOptions): Promise<DIDDocument> => {
    const res = await fetch(`${baseUrl}/${method}`,
    {
        method: `PUT`,
        body: JSON.stringify(options)
    });
    return res.json();
}

export const getDID = async (method: DIDMethod, didId: string, options: DIDOptions): Promise<DIDDocument> => {
    const res = await fetch(`${baseUrl}/${method}/${didId}`,
    {
        body: JSON.stringify(options)
    });
    return res.json();
}

export const resolveDID = async (didId: string): Promise<DIDDocument> => {
    const res = await fetch(`${baseUrl}/resolver/${didId}`);
    return res.json();
}