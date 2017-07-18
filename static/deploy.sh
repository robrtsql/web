#/bin/sh

DIR=/home/robrtsql/github.com/robrtsql/web/static
node $DIR/App.js
cp $DIR/dist/index.html ~/public_html/index.html
cp $DIR/theme.css ~/public_html/theme.css
cp -rf $DIR/js ~/public_html
cp -rf $DIR/css ~/public_html
cp -rf $DIR/fonts ~/public_html
