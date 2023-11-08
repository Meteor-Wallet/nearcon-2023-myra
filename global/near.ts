import * as nearAPI from 'near-api-js';

let near: nearAPI.Near;
export async function getNearClient(): Promise<nearAPI.Near> {
    if (near) {
        return near;
    }

    near = await nearAPI.connect({
        nodeUrl: 'https://rpc.mainnet.near.org',
        networkId: 'mainnet',
    });

    return near;
}
