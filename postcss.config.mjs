import postcssImport from 'postcss-import';
import postcssNesting from 'postcss-nesting';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
    plugins: {
        'postcss-import': postcssImport,
        'postcss-nesting': postcssNesting,
        tailwindcss: tailwindcss,
        autoprefixer: autoprefixer,
    },
};
