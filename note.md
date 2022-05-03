项目搭建规范
一. 代码规范
1.1. 集成 editorconfig 配置
EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

```
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

VSCode 需要安装一个插件：EditorConfig for VS Code

image-20210722215138665

1.2. 使用 prettier 工具
Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

1.2.1 配置.prettierrc 文件：

useTabs：使用 tab 缩进还是空格缩进，选择 false；
tabWidth：tab 是空格的情况下，是几个空格，选择 2 个；
printWidth：当行字符的长度，推荐 80，也有人喜欢 100 或者 120；
singleQuote：使用单引号还是双引号，选择 true，使用单引号；
trailingComma：在多行输入的尾逗号是否添加，设置为 none；
semi：语句末尾是否要加分号，默认值 true，选择 false 表示不加；

```
{
"useTabs": false,
"tabWidth": 2,
"printWidth": 80,
"singleQuote": true,
"trailingComma": "none",
"semi": false
}
```

1.2.2 创建.prettierignore 忽略文件

/dist/\*
.local
.output.js
/node_modules/\*\*

**/\*.svg
**/\*.sh

/public/\*

1.2.3 VSCode 需要安装 prettier 的插件

image-20210722214543454

1.2.4 测试 prettier 是否生效

测试一：在代码中保存代码；
测试二：配置一次性修改的命令；
在 package.json 中配置一个 scripts：

    "prettier": "prettier --write ."

1.3. 使用 ESLint 检测

1.3.1 在前面创建项目的时候，我们就选择了 ESLint，所以 Vue 会默认帮助我们配置需要的 ESLint 环境。

2.VSCode 需要安装 ESLint 插件：

image-20210722215933360

3.解决 eslint 和 prettier 冲突的问题：

安装插件：（vue 在创建项目时，如果选择 prettier，那么这两个插件会自动安装）

npm i eslint-plugin-prettier eslint-config-prettier -D
在.eslintrc.js 中添加 prettier 插件'plugin:prettier/recommended'覆盖上面的规则：

extends: [
"plugin:vue/vue3-essential",
"eslint:recommended",
"@vue/typescript/recommended",
"@vue/prettier",
"@vue/prettier/@typescript-eslint",
'plugin:prettier/recommended'
],
