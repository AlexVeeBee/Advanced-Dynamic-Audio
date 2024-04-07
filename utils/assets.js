import { getRequestHeaders } from "../../../../../script.js";

const cachedAssets = new Map();

export const GetAssets = async (type) => {
    if (cachedAssets.has(type)) {
        return cachedAssets.get(type);
    }
    if (!type) {
        return [];
    }
    const res = await fetch('/api/assets/get', {
        method: 'POST',
        headers: getRequestHeaders(),
    });
    if (!res.ok) {
        return [];
    }
    const assets = res.ok ? (await res.json()) : { type: [] };
    const output = assets[type];
    for (const i in output) {
        output[i] = output[i].replaceAll('\\', '/');
    }
    cachedAssets.set(type, output);
    return output;
}
export { cachedAssets };
