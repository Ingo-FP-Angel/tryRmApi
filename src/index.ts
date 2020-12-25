import { Remarkable, ItemResponse } from 'remarkable-typescript';
require('custom-env').env("local");

(async () => {
    /*
    * Create the reMarkable client
    * Params: { deviceToken?: string }
    * Returns: client: Remarkable
    */
    const client = new Remarkable({
        deviceToken: process.env.TOKEN,
    });

    /*
    * Register your reMarkable and generate a device token. You must do this first to pair your device if you didn't specify a token. This may take a few seconds to complete. It seems that the deviceToken never expires.
    * Params: { code: string }
    * Returns: deviceToken: string
    */
    // const deviceToken = await client.register({ code: process.env.ONE_TIME_CODE });

    // (optional) skip registration in the future with `new Remarkable({deviceToken})`
    // console.log(deviceToken);

    /*
    * (Re)generate a token from the deviceToken. You MUST call this function after creating the client. This token, used to interact with storage, is different from the deviceToken. This function is automatically called in register(). This token expires.
    * Params: none
    * Returns: token: string
    */
    await client.refreshToken();

    /*
    * List all items, files and folders.
    * Params: none
    * Returns: ItemResponse[]
    */
    const items: ItemResponse[] = await client.getAllItems();

    items.forEach(item => {
        console.log(item);
    });
})();
