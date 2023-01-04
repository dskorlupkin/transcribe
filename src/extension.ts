// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "transcribe" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('transcribe.transcribe', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			// Get the word within the selection
			const word = document.getText(selection);


			//const reversed = word.split('').reverse().join('');
			const transcribed = transcribe(word);
			editor.edit(editBuilder => {
				editBuilder.replace(selection, transcribed);
			});
		}

		vscode.window.showInformationMessage('Hello Cruel World from transcribe!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }

var a = "qwertyuiop[]asdfghjkl;'zxcvbnm,.`@#$^&QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>/?";
var b = "йцукенгшщзхъфывапролджэячсмитьбюё\"№;:?ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ.,";

function strMap(str: string, from: string, to: string) {
	return str.split('').map((e) => {
		var i = -1;
		i = from.indexOf(e);
		return i >= 0 ? to[i] : e;
	}).join('');
}

function transcribe(s: string) {
	if (analyseIsLatin(s)) {
		return strMap(s, a, b);
	}
	else {
		return strMap(s, b, a);
	}
}
function analyseIsLatin(str: string) {
	var latin = 0, cyrilic = 0;
	str.split('').forEach(c => {
		var cp = c.codePointAt(0);
		if (cp) {
			if (cp > 0x0020 && cp <= 0x007f) { latin++; }
			if (cp >= 0x0400 && cp <= 0x04ff) { cyrilic++; }
		}
	});
	latin /= str.length;
	cyrilic /= str.length;
	return latin > cyrilic;
}