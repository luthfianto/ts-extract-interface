const vscode = require('vscode');
const { extractInterface } = require("./src/extract-interface")

exports.writeExtracted = function () {
    const editor = vscode.window.activeTextEditor;
    const { document, selection } = editor;

    const selectionLine = selection.end.line;
    const interfaceString = document.getText(selection)
    const promise = extractInterface(interfaceString)

    const edit = new vscode.WorkspaceEdit();
    const lastLine = document.lineAt(selectionLine);
    promise.then(extracted => {
        edit.insert(document.uri, lastLine.range.end, extracted);
        return vscode.workspace.applyEdit(edit)
    })
}

exports.activate = function (context) {
    const disposable = vscode.commands.registerCommand('extension.writeExtracted', exports.writeExtracted);
    context.subscriptions.push(disposable);
}

exports.deactivate = function () {
}