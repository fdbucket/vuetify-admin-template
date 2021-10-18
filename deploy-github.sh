#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# Github 跟路径: /vuetify-admin-template/
# 生成静态文件
BUILD_ROOT_URL=/vuetify-admin-template/ npm run build

# 切换分支到gh-pages
git checkout gh-pages

# 清理旧文件
rm -fr docs

# 新文件
mv dist docs

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:fdbucket/vuetify-admin-template.git gh-pages:gh-pages
