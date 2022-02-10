const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const fs = require('fs');

const getTsxFile = p => {
    let ret = {};
    const toDir = d => {
        const files = fs.readdirSync(path.join(__dirname, d));
        files.forEach(f => {
            const c = f.split('.');
            if(c.length === 1){
                console.log(c);
                if(c != 'scss') toDir(`${d}/${c[0]}`);
            } else {
                ret[f.substring(0, f.lastIndexOf('.'))] = `./${d}/${f}`;
            }
        })
    }
    toDir(p);
    console.log(ret);
    return ret;
}

module.exports ={
    entry: getTsxFile("src"),
    output:{
        filename:'[name].js',
        path: path.resolve(__dirname, 'public', 'js'),
    },
    resolve:{
        extensions: [".ts", ".tsx", ".js"]
    },
    module:{
        rules:[
            {
                test:/\.(ts|tsx)$/,
                use:[
                    'babel-loader',
                    {
                        loader:'ts-loader',
                        options:{
                            transpileOnly:true,
                        },
                    },
                ],
                exclude:[
                    /node_modules/
                ],
            },
            {
                test:/\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
    },
}