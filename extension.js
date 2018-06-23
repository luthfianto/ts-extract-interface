const vscode = require('vscode');
const { extractInterface } = require("./src/extract-interface")

exports.writeExtracted = function () {
    const editor = vscode.window.activeTextEditor;
    const { document, selection } = editor;

    const selectionLine = selection.end.line;
    const lastLine = document.lineAt(selectionLine);

    const interfaceString = document.getText(selection)
    const promise = extractInterface(interfaceString)
    const edit = new vscode.WorkspaceEdit();
    promise.then(extraced => {
        edit.insert(document.uri, lastLine.range.end, extraced);
        return vscode.workspace.applyEdit(edit)
    })
}

exports.activate = function (context) {
    const disposable = vscode.commands.registerCommand('extension.writeExtracted', exports.writeExtracted);
    context.subscriptions.push(disposable);
}

exports.deactivate = function () {
}