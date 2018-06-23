const typescriptParser = require("typescript-parser");
const parser = new typescriptParser.TypescriptParser();

/**
 * 
 * @param {string} sourceString 
 */
async function extractInterface(sourceString) {
    const parsed = await parser.parseSource(sourceString);

    const classDeclaration = parsed.declarations.filter(declaration => declaration instanceof typescriptParser.ClassDeclaration)[0];
    const className = classDeclaration.name;

    const classMethods = classDeclaration.methods;
    const publicMethods = classMethods
        .filter(method => method.visibility === undefined || method.visibility > 1);

    const pretty = publicMethods.map(method => {
        const signatureArray = method.parameters.map(param => `${param.name}: ${param.type}`);

        const signature = signatureArray.join(", ");
        const name = `${method.name}`;
        const returnType = method.type || "{}";
        return `${name}(${signature}): ${returnType}`;
    })

    const res = `
export interface I${className} {
    ${pretty.join(";\n    ")};
}`

    return res;
}

module.exports = { extractInterface };