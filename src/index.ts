#!/usr/bin/env node
import { cac } from 'cac';
import clipboard from 'clipboardy';
import json2typebox from 'json2typebox';
import logSymbols from 'log-symbols';
import projectInfo from '../package.json';

async function bootstrap() {
  const cli = cac('json2typebox');
  cli
    .command('quick', 'Read JSON from the clipboard and generate TypeBox types into the clipboard.')
    .action(async () => {
      const clipboardStr = clipboard.readSync();
      try {
        const code = await json2typebox(clipboardStr, 'Root');
        clipboard.writeSync(code);
        console.log(logSymbols.success, 'Successfully converted into typebox, to clipboard!');
      }
      catch (error) {
        console.log(logSymbols.error, 'Failed, check whether the paste board data is json.');
        throw error;
      }
    });

  cli.help();
  cli.version(projectInfo.version);
  cli.parse(process.argv);
}

bootstrap();
