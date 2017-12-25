set -e
VERSION="0.1"

./node_modules/.bin/webpack
csplit index_template.html /INLINE_STYLE_HERE/ /INLINE_SCRIPT_HERE/

{
  cat xx00
  echo '<style>'
  cat node_modules/bootstrap/dist/css/bootstrap.css
  echo '</style>'
  tail -n +2 xx01
  echo '<script id="qrcode_worker" type="javascript/worker">'
  cat 'node_modules/barcode.js/w69b.qrcode.decodeworker.js'
  echo '</script>'
  echo '<script>'
  cat node_modules/barcode.js/w69b.qrcode.js
  cat dist/bundle.js
  echo '</script>'
  tail -n +2 xx02
} > out.html

rm xx00 xx01 xx02
name=tinfoil_${VERSION}_SHA256_$(sha256sum out.html  | cut -d' ' -f1).html
mv out.html $name

sed "s#REDIR_PAGE#$name#" redir_template.html > index.html

