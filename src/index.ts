#!/usr/bin/env node
import JsonToTs from 'json-to-ts';
import * as Codegen from '@sinclair/typebox-codegen';
import clipboard from 'clipboardy';
import logSymbols from 'log-symbols';

const bootstrap = () => {
  const clipboardValue = clipboard.readSync();

  let typeText = '';
  try {
    JsonToTs(JSON.parse(clipboardValue), { rootName: 'Root', useTypeAlias: true }).forEach((typeInterface) => {
      typeText += typeInterface;
    });
  } catch (error) {
    console.log(logSymbols.error, '转化失败, 请检查粘贴板数据是否正确');
    process.exit(1);
  }
  const code = Codegen.TypeScriptToTypeBox.Generate(typeText);
  const finalCode = Codegen.Formatter.Format(code);
  clipboard.writeSync(finalCode);
  console.log('');
  console.log(logSymbols.success, 'Typescript类型转化TypeBox类型成功, 已保存至粘贴板~');
};

bootstrap();
