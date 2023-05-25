export async function fetchHandler(
    inputURL: string,
    method: string,
    form?: FormData | any,
): Promise<Response> {
    const request: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    }
    if (form) request.body = JSON.stringify(form)

    return fetch(inputURL, request)
}

export async function fetchHandlerWithToken(
    inputURL: string,
    method: string,
    token: string,
    form?: FormData | any,
): Promise<Response> {
    const request: RequestInit = {
        method,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    }
    if (form) request.body = JSON.stringify(form)
    return fetch(inputURL, request)
}
