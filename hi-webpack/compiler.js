const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('@babel/core');
const options = require('./webpack.config');

/**
 * Parser 解析器
 */
const Parser = {
  getAst: (path) => {
    console.log('[Parser] [getAst] path', path);
    const content = fs.readFileSync(path, 'utf-8');
    console.log('[Parser] [getAst] content', content);
    return parser.parse(content, {
      sourceType: 'module',
    });
  },
  getDependecies: (ast, filename) => {
    console.log('[Parser] ast', ast);
    console.log('[Parser] filename', filename);
    const dependecies = {};
    traverse(ast, {
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename);
        console.log('[Parser] filename', filename);
        const filepath = './' + path.join(dirname, node.source.value);
        console.log('[Parser] filepath', filepath);
        dependecies[node.source.value] = filepath;
      }
    });
    return dependecies;
  },
  getCode: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    });
    return code;
  }
};

/**
 * Complier 编译器
 */
class Complier {
  constructor(options) {
    console.log('[Complier] options', options);
    const {entry, output} = options;
    // 配置文件入口
    this.entry = entry;
    // 构建产物出口
    this.output = output;
    // 模块
    this.modules = [];
  }
  // 构建启动编译
  run() {
    // const ast = Parser.getAst(this.entry);
    // console.log('[Complier] ast', ast);
    // const dependecies = Parser.getDependecies(ast, this.entry);
    // console.log('[Complier] dependecies', dependecies);
    // const code = Parser.getCode(ast);
    // console.log('[Complier] code', code);
    const entryFile = this.build(this.entry);
    console.log('[Complier] entryFile', entryFile);
    this.modules.push(entryFile);
    this.modules.forEach(({ dependecies }) => {
      console.log('[Complier] dependecies', dependecies);
      // 判断是否有依赖对象，递归解析所有依赖项
      if (dependecies) {
        for (const dependency in dependecies) {
          // console.log('[Complier] dependecies', dependecies);
          // console.log('[Complier] dependency', dependency);
          // console.log('[Complier] dependecies[dependency]', dependecies[dependency]);
          this.modules.push(this.build(dependecies[dependency]));
          // this.build(dependecies[dependency]);
        }
      }
    });
    console.log('[Complier] this.modules', this.modules);

    // 依赖关系图
    const dependencyGraph = this.modules.reduce((graph, item) => ({
      ...graph,
      [item.filename]: {
        dependecies: item.dependecies,
        code: item.code
      }
    }), {});

    console.log('[Complier] [run] dependencyGraph', dependencyGraph);
    this.generate(dependencyGraph);
  }
  build(filename) {
    const { getAst, getCode, getDependecies } = Parser;
    const ast = getAst(filename);
    const dependecies = getDependecies(ast, filename);
    const code = getCode(ast);

    return {
      filename,
      dependecies,
      code,
    }
  }
  generate(code) {
    const filePath = path.join(this.output.path, this.output.filename);
    console.log('[Complier] filePath', filePath);
    const bundle = `(function(graph){
      function require(module){
        function localRequire(relativePath){
          return require(graph[module].dependecies[relativePath])
        }
        var exports = {};
        (function(require,exports,code){
          eval(code)
        })(localRequire,exports,graph[module].code);
        return exports;
      }
      require('${this.entry}')
    })(${JSON.stringify(code)})`;
    // 写入文件系统
    fs.writeFileSync(filePath, bundle, 'utf-8');
  }
}

// 初始化 Complier 对象启动构建
new Complier(options).run();
