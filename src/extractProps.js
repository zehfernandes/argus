const { readFileSync } = require('fs');

const { parse } = require("@typescript-eslint/typescript-estree");
const { generate } = require('astring')

// const { default: generate } = require("@babel/generator");
const { transform } = require('babel-core');

const astray = require("astray")


// --------------------------------
// Find References
// ----------------------------------
const content = readFileSync("./Button.js", 'utf-8');

const ast = parse(content)
// const { ast } = transform(content, {
//     presets: ['stage-0']
// });

astray.walk(ast, {
    //
    Identifier(node, state) {
        if (node.name === "variants") {
            ref = node
            let code = node.path.parent
            console.log(code)
            console.log(generate(code))
        }
    },
});


// --------------------------------
// Extract Props Methods
// ----------------------------------

// Only works with two nested level. What I guess is the limit of stiches
function getPropsfromVariants() { 
    const props = []
    for (const key of Object.keys(variants)) {
        let propEntries = []
        for (const prop of Object.keys(variants[key])) { 
            propEntries.push(prop)
        }
        props.push({key, values: propEntries})
    }

    return  props
}

function getPropsFromPropType() {}

function getPropsFromArgs() {}

// https://github.com/moroshko/react-scanner/blob/master/src/scan.js
function getPropsFromUsage() {}

// --------------------------------
// Generate File
// ----------------------------------