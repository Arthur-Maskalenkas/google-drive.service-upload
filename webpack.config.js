const path = require('path')

module.exports = {
    mode: 'development',
    target: 'node',
    node: false,
    devtool: 'source-map',
    entry: './src/main/server.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],

                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        alias: {
            '@/infra': path.resolve(__dirname, 'src/infra'),
            '@/main': path.resolve(__dirname, 'src/main'),
            '@/service': path.resolve(__dirname, 'src/service'),
            '@/domain': path.resolve(__dirname, 'src/domain'),
            '@/presentation': path.resolve(__dirname, 'src/presentation'),
        },
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            // Adicione substituições vazias para as dependências opcionais aqui
            bufferutil: false,
            'utf-8-validate': false,
        },
    },
}
