const baseUrl = `/v1/operations`;

type OperationStatusOptions = 'done' | 'pending';

export const listOperations = async (filterBy?: OperationStatusOptions, submissionId?: string) => {
    const res = await fetch(`${baseUrl}`,
    {
        ...((filterBy || submissionId) && {
            body: JSON.stringify({
                ...(submissionId && { parent: submissionId }),
                ...(filterBy && { filter: `done = ${!!(filterBy === 'done')}`})
            })
        })
    });
    return res.json(); 
}

export const getOperation = async (operationId: string) => {
    const res = await fetch(`${baseUrl}/${operationId}`);
    return res.json();
}

export const cancelOperation = async (operationId: string) => {
    const res = await fetch(`${baseUrl}/cancel/${operationId}`);
    return res.json();
}