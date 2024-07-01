export const useTailwindTheme = (theme) => {
    if (theme.value === 'lightTheme') {
        document.documentElement.classList.toggle('darkTheme');
    }

    // eslint-disable-next-line no-undef
    watchEffect(() => {
        const html = document.documentElement;
        html.classList.remove('bg-light', 'bg-dark');
        html.classList.add(theme.value === 'lightTheme' ? 'bg-light' : 'bg-dark');
        document.documentElement.classList.toggle('darkTheme');
    });
};
