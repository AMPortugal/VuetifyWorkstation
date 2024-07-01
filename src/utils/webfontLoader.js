export async function loadFonts() {
    const WebFont = await import(/* webpackChunkName: "webfontloader" */ 'webfontloader');

    WebFont.load({
        google: {
            families: [
                /*'Roboto:ital,wght@100,300,400,500,700,900&display=swap',*/
                'Lato',
                'Roboto',
            ],
        },
    });
}
