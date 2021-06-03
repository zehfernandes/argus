const { readFileSync } = require('fs');

//const { parse } = require("@typescript-eslint/typescript-estree");
const { parse } = require("@typescript-eslint/parser");
const { generate } = require('astring')

const astray = require("astray")

const parseOptions = {
    loc: true,
    jsx: true,
  };

// --------------------------------
// Find References
// ----------------------------------
function findReferences(file) {
    const content = readFileSync(file, 'utf-8');

    // TODO: Compile js before parse ast to get all the props
    const ast = parse(content, parseOptions)

    let props = []

    astray.walk(ast, {
        // JSXOpeningElement(node) {
        //     console.log(node)
        // },
        // Find Variants
        Identifier(node, state) {
            if (node.name === "variants") {
                let vNode = node.path.parent

                // TODO: Manipulate with walk instead of stringfy
                let stringCode = generate(vNode).replace("variants:", "").replace(/'/g, '"').replace(/&:/g, '&')
                stringCode = stringCode.replace(/(['"])?([a-z0-9A-Z_&]+)(['"])?:/g, '"$2": ');
                //console.log(stringCode)
                let obj = JSON.parse(stringCode)

                props = getPropsfromVariants(obj)
            }
        },
    });

    console.log(props)
}


// --------------------------------
// Extract Props Methods
// ----------------------------------

// Only works with two nested level. What I guess is the limit of stiches
function getPropsfromVariants(variants) {
    const props = []
    for (const key of Object.keys(variants)) {
        let propEntries = []
        for (const prop of Object.keys(variants[key])) {
            propEntries.push(prop)
        }
        props.push({ key, values: propEntries })
    }

    return props
}

function getPropsFromPropType() { }

function getPropsFromArgs() { }

// https://github.com/moroshko/react-scanner/blob/master/src/scan.js
function getPropsFromUsage() { }

// --------------------------------
// Generate File
// ----------------------------------
function createFile(variations, component) {
	
}



// --------------------------------
// Start
// node extractProps.js ./src/components/Button.js
// ----------------------------------
const main = function () {
    const componentFile = process.argv[2]
    if (componentFile === undefined || componentFile === "") {
        console.error("Please pass a path, e.g.: node extractProps.js ./Button.js")
        return
    }
    findReferences(componentFile)
}

main()