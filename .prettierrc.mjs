/** @type {import("prettier").Config} */
export default {
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    tabWidth: 4,
    printWidth: 80,
    plugins: ['prettier-plugin-astro'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
        {
            files: '*.json',
            options: {
                printWidth: 100,
            },
        },
        {
            files: '*.md',
            options: {
                proseWrap: 'always',
            },
        },
    ],
};
