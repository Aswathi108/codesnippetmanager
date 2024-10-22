import * as vscode from 'vscode';

let snippetLibrary: {[key: string]: string} = {};

export function activate(context: vscode.ExtensionContext) {

	let saveSnippet = vscode.commands.registerCommand('snippetManager.saveSnippet', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selectedText = editor.document.getText(editor.selection);
            const snippetName = await vscode.window.showInputBox({ prompt: 'Enter a name for this snippet' });
            if (snippetName) {
                // #include<stdio.h>
// int main(){
//     printf("hello world");
//     return 0;
// }
                vscode.window.showInformationMessage(`Snippet '${snippetName}' saved!`);
      }
    }
  });
  

  let searchSnippet = vscode.commands.registerCommand('snippetManager.searchSnippet', async () => {
    const snippetName = await vscode.window.showQuickPick(Object.keys(snippetLibrary), {
      placeHolder: 'Select a snippet to insert'
    });
    if (snippetName) {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        editor.edit(editBuilder => {
          editBuilder.insert(editor.selection.active, snippetLibrary[snippetName]);
        });
        vscode.window.showInformationMessage(`Snippet '${snippetName}' inserted!`);
      }
    }
  });

  let insertSnippet = vscode.commands.registerCommand('snippetManager.insertSnippet', async () => {
    const snippetName = await vscode.window.showQuickPick(Object.keys(snippetLibrary), {
      placeHolder: 'Choose a snippet to insert'
    });
    if (snippetName) {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        editor.edit(editBuilder => {
          editBuilder.insert(editor.selection.active, snippetLibrary[snippetName]);
        });
      }
    }
  });

  context.subscriptions.push(saveSnippet);
  context.subscriptions.push(searchSnippet);
  context.subscriptions.push(insertSnippet);
}

export function deactivate() {}

