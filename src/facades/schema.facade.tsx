const baseUrl = `/v1/schemas`;

interface SchemaOptions {
    author: string,
    name: string, 
    schema: string
    // This call also takes a boolean `sign` property, which we will always pass true
}

export const getSchemas = async () => {
    const res = await fetch(`${baseUrl}`);
    return res.json();
}

export const createSchema = async (options: SchemaOptions) => {
    const res = await fetch(`${baseUrl}`, 
    {
        method: `PUT`,
        body: JSON.stringify({...options, sign: true})
    });
    return res.json();
}

export const deleteSchema = async (schemaId: string) => {
    const res = await fetch(`${baseUrl}/${schemaId}`, {
        method: 'DELETE'
    });
    return res.json();
}

export const getSchema = async (schemaId: string) => {
    const res = await fetch(`${baseUrl}/${schemaId}`);
    return res.json();
}