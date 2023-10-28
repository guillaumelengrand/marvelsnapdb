export async function fetchWrapper(url: string, data: any, method: string, dataType = 'JSON') {
    let options: RequestInit = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method,
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    let res = await fetch(url, options);

    return res;
}
