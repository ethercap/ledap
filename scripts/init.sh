#/bin/bash
set -e

# 参见：https://github.com/axios/axios/issues/1221
cp node_modules/axios/index.d.ts node_modules/@types/axios/index.d.ts
cd examples 
npm install 
ln -s -f ../umd ./dist
