/*eslint no-undef: "error"*/
/*eslint-env node*/

module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
    ],
};
