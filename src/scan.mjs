import traverse from 'babel-traverse';
import {readFileSync} from 'fs';
import {transform } from 'babel-core';
import * as astray from 'astray';
import flow from 'flow-parser'

const content = readFileSync("./Button.js", 'utf-8');
console.log(content)

const {ast} = transform(content, {
  presets: ['stage-0']  
});

console.log(ast)

let ref, STATE = new Map;

astray.walk(ast, {
  Identifier(node, state) {
    if (node.name === 'variants') {
      console.log(node)
      ref = node;
    }
  },
}, STATE);

//const bindings = astray.lookup(ref);



// const r = transformSync("code", {
//   presets: ["@babel/preset-react"],
// });

// console.log(r)


// try 2
// function flowAst(code) {
//   try {
//     return flow.parse(code, {
//       esproposal_decorators: true,
//       esproposal_class_instance_fields: true,
//       esproposal_class_static_fields: true,
//       esproposal_export_star_as: true,
//       esproposal_optional_chaining: true,
//       esproposal_nullish_coalescing: true,
//       types: true
//     })
//   } catch (error) {
//     console.log('suming-log', error);
//   }
// }

// console.log(flowAst(content))