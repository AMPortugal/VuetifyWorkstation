export async function loadFonts() {
    const WebFont = await import('webfontloader');

    WebFont.load({
        google: {
            families: [
                'Roboto:ital,wght@100,300,400,500,700,900&display=swap',
                'Lato:ital,wght@100,300,400,500,700,900&display=swap',
            ],
        },
    });
}
