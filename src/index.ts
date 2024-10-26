#!/usr/bin/env node
import clipboard from 'clipboardy';
import { json2typebox } from 'json2typebox';
import logSymbols from 'log-symbols';
const bootstrap = async () => {
  const clipboardStr = clipboard.readSync();
  try {
    const code = await json2typebox(clipboardStr, 'Root');
    clipboard.writeSync(code);
    console.log(logSymbols.success, 'Typescript类型转化TypeBox类型成功, 已复制至粘贴板~');
  } catch (error) {
    console.log(logSymbols.error, '转化失败, 请检查粘贴板内容是否为json格式');
  }
};

bootstrap();
