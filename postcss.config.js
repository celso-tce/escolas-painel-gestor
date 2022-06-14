const NODE_ENV = process.env['NODE_ENV'];

module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        ...(NODE_ENV === 'production' ? { cssnano: {} } : {}),
    },
};
