const baseUrl = `/v1/presentation/submissions`;

type SubmissionStatusOptions = 'pending' | 'approved' | 'denied' | 'cancelled';

interface SubmissionOptions {
    approved: boolean, 
    reason?: string
}

export const listPresentationSubmissions = async (filterBy?: SubmissionStatusOptions) => {
    const res = await fetch(`${baseUrl}`,
    {
        ...(filterBy && {
            body: JSON.stringify({
                filter: `status = ${filterBy}`
            })
        })
    });
    return res.json(); 
}

export const getPresentationSubmission = async (submissionId: string) => {
    const res = await fetch(`${baseUrl}/${submissionId}`);
    return res.json(); 
}

export const reviewPresentationSubmission = async (submissionId: string, options: SubmissionOptions) => {
    const res = await fetch(`${baseUrl}/${submissionId}/review`,
    {
        method: `PUT`,
        body: JSON.stringify(options)
    });
    return res.json(); 
}