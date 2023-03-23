const baseUrl = `/v1/dids`;

export const keyTypeOptions = [
    'Ed25519',
    'X25519',
    'secp256k1',
    'P-224',
    'P-256',
    'P-384',
    'P-521',
    'RSA'
] as const;

export const DIDMethodOptions = [
    'key',  
    'web'
] as const;


export type DIDKeyType = typeof keyTypeOptions[number];

export type DIDMethod = typeof DIDMethodOptions[number];


interface DIDOptions {
    keyType: DIDKeyType, 
    didWebId?: string
}

export interface DIDDocumentWithKey {
    did: DIDDocument, 
    privateKeyBase58: string, 
    keyType: DIDKeyType
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

export const getKeyDIDs = async (): Promise<DIDDocument[]> => {
    const res = await fetch(`${baseUrl}/key`);
    return (await res.json()).dids
}

export const getWebDIDs = async (): Promise<DIDDocument[]> => {
    const res = await fetch(`${baseUrl}/web`);
    return (await res.json()).dids
}

export const getDIDs = async (): Promise<DIDDocument[]> => {
    const web = await getWebDIDs();
    const key = await getKeyDIDs();
    return [...key, ...web];
}

export const createDID = async (method: DIDMethod, options: DIDOptions): Promise<DIDDocumentWithKey> => {
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