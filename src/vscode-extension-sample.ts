import {
  commands,
  ExtensionContext,
  Hover,
  languages,
  MarkdownString,
  Position,
  TextDocument,
  window,
} from 'vscode';

const outputChannel = window.createOutputChannel('VS Code Extension Sample');

export function activate(context: ExtensionContext) {
  let commandDisposable = commands.registerCommand(
    'vscode-extension-sample.helloWorld',
    provideCommand
  );
  outputChannel.appendLine('command is initialized !');

  let hoverDisposable = languages.registerHoverProvider(
    [
      { scheme: 'file', language: 'json' },
      { scheme: 'file', language: 'jsonc' },
    ],
    { provideHover }
  );
  outputChannel.appendLine('hover is initialized !');

  context.subscriptions.push(commandDisposable, hoverDisposable);
  outputChannel.appendLine('command and hover are pushed to the context !');
  outputChannel.appendLine('vscode-extension-sample is now active !');
}

async function provideHover(document: TextDocument, position: Position) {
  outputChannel.appendLine('my hover is called !');
  const content = new MarkdownString(`myString`);

  return new Hover(content);
}

async function provideCommand(document: TextDocument, position: Position) {
	outputChannel.appendLine('my command is called !');

}
