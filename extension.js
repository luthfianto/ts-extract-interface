const { extractInterface } = require("./src/extract-interface")

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

exports.writeExtracted = function () {
    const editor = vscode.window.activeTextEditor;
    const { document, selection } = editor;

    const selectionLine = selection.end.line;
    const lastLine = document.lineAt(selectionLine);

    const interfaceString = document.getText(selection)
    extractInterface(interfaceString).then(res => {
        const edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, lastLine.range.start, res);
        return vscode.workspace.applyEdit(edit)
    })
}

exports.activate = function (context) {
    const disposable = vscode.commands.registerCommand('extension.writeExtracted', exports.writeExtracted);
    context.subscriptions.push(disposable);
}

exports.deactivate = function () {
}