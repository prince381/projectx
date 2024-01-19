/* eslint-disable @typescript-eslint/no-explicit-any */
export function parseQueryParams(queryString: string) {
    let urlString = '';
    if (queryString.startsWith('?')) urlString = queryString.substring(1);
    const decodedString = decodeURIComponent(urlString);
    const params = decodedString.split('&').reduce((paramObj: {[x: string]: any}, curval) => {
        const [key, value] = curval.split('=');
        paramObj[key] = value;
        return paramObj;
    }, {});
    return params;
}
