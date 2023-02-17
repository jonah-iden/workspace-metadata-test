import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {


	let disposable = vscode.commands.registerCommand('workspace-metadata-test.workspaceEditRefactoring', async () => {
		const edit = new vscode.WorkspaceEdit();
		await applyEditForAllOpenDocuments(edit);
		vscode.workspace.applyEdit(edit, { isRefactoring: true })
	});
	let disposable2 = vscode.commands.registerCommand('workspace-metadata-test.workspaceEditNoRefactoring', async () => {
		const edit = new vscode.WorkspaceEdit();
		await applyEditForAllOpenDocuments(edit);
		vscode.workspace.applyEdit(edit)
	});

	context.subscriptions.push(disposable, disposable2);
}

async function applyEditForAllOpenDocuments(edit: vscode.WorkspaceEdit) {
	(await Promise.all(vscode.window.tabGroups.activeTabGroup.tabs.map(tab => vscode.workspace.findFiles(tab.label)))).flatMap(uri => uri).forEach(uri => {
		console.log(uri.toString());
		edit.insert(uri, new vscode.Position(1, 1), 'test')
	});
}

// This method is called when your extension is deactivated
export function deactivate() { }
