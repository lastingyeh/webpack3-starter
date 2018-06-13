### webpack 3 notes

#### Versions (package.json)

    - webpack 3.12.0

    - webpack-dev-server 2.11.2

#### Commands (package.json)

    1. dev [--watch] watch file

    2. prod [-p] compress

        $ webpack src/app.js dist/app.bundle.js [--watch] [-p]

#### Plugins (webpack.config.js) - module.rule & plugins

    1. html-webpack-plugin

        * generate template html

```javascript
    // use multiple html files entry
    entry: {
		'app.bundle': './src/app.js',
		contact: './src/contact.js',
		utils: './src/utils.js',
    }
    ...

    // modify plugins
    new HtmlWebpackPlugin({
			title: 'Contact page update',
			template: './src/contact.html',
			filename: 'contact.html',
			minify: { collapseWhitespace: true },
			hash: true,
			excludeChunks: ['app.bundle'], // exclude this file
		}),
```

    2. extract-text-webpack-plugin

        * separate css | scss from app.bundle.js

    3. clean-webpack-plugin

        * as cache exchange was detected, it will generate different 'hash' js file

```javascript
    // add code here
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
    },

    // clean old hash file / dir
    plugins: [
        ...
        new CleanWebpackPlugin(['dist']),
    ],
```

    4. Hot Module Replacement

        4.1 webpack.NamedModulesPlugin

        4.2 webpack.HotModuleReplacementPlugin

```javascript
    // add 'hot:true'
    devServer: {
		port: 9000,
		open: true,
		hot: true,
    },
    ...
    // modify ExtractTextPlugin
    new ExtractTextPlugin({ filename: 'styles.css', disable: true }),
```

[Refs by Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/)

#### Loaders (webpack.config.js) - module rules

    1. css  

        $ npm i --save-dev css-loader style-loader

    2. scss

        $ npm i --save-dev sass-loader node-sass

    3. babel

        $ npm i --save-dev babel-core babel-preset-react babel-preset-env

        $ npm i --save-dev babel-loader

            - add .babelrc

    4. pug

        $ npm i --save-dev pug-html-loader pug raw-loader

    5. file / image loader

        $ npm i --save-dev file-loader 

    6. compress image size

        $ npm i --save-dev html-webpack-loader

    7. support svg file

        $ npm i --save-dev html-loader

#### Production & Development config settings

    1. package.json

```json
    "scripts": {
        "dev": "webpack-dev-server",
        "prod": "NODE_ENV=production webpack -p"
    },
```

    2. webpack.config.js

```javascript (demo)
    const isProd = process.env.NODE_ENV === 'production';

    const cssDev = ['style-loader', 'css-loader', 'sass-loader'];

    const cssProd = ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
    });

    const cssConfig = isProd ? cssProd : cssDev;
    ...
```

#### Debug (webpack.config.js)

    1. js 

```javascript
    module.exports = {
    ...
	devtool: 'source-map',
```

    2. scss & css (add '?sourceMap')

```javascript

    const cssDev = ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'];
```

#### production & development config settings

    1. $ npm i webpack-merge --save-dev

    2. $ touch webpack.common.js webpack.prod.js webpack.dev.js

    3. write common-use in 'webpack.common.js', see webpack.common.js

    4. write dev-use in 'webpack.dev.js', see webpack.dev.js (ex. devServer, devTool...)

    5. write prod-use in 'webpack.prod.js', see webpack.prod.js (ex. set env)

    6. modify in package.json

```json
    "scripts": {
        "dev": "webpack-dev-server --config webpack.dev.js",
        "prod": "webpack --config webpack.prod.js"
    },
```


#### References By 

[1. webpack 3 零基础入门视频教程](https://www.youtube.com/playlist?list=PLqz9dierEhT6yENDFYHqMVkDgGlOqpk_8)

[2. webpack 3 零基础入门教程](https://www.rails365.net/groups/webpack)