#!/usr/bin/env node
const { spawnSync } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');

// eslintのプラグイン競合チェックを回避
process.env.SKIP_PREFLIGHT_CHECK = 'true';

// react-scriptsの実行コマンドと引数を取得
const [command, ...extraArgs] = process.argv.slice(2);
if (!command) {
  console.error('実行するreact-scriptsコマンドを指定してください。');
  process.exit(1);
}

const REACT_SCRIPTS_VERSION = '5.0.1';
const binaryName = process.platform === 'win32' ? 'react-scripts.cmd' : 'react-scripts';
const localBinary = join(process.cwd(), 'node_modules', '.bin', binaryName);

// 子プロセスを同期実行し終了コードを返却
const runCommand = (cmd, args) => {
  const result = spawnSync(cmd, args, { stdio: 'inherit', env: process.env });
  if (result.error) {
    console.error(`コマンド実行に失敗しました: ${result.error.message}`);
    return 1;
  }
  if (typeof result.status === 'number') {
    return result.status;
  }
  if (result.signal) {
    console.error(`プロセスがシグナル${result.signal}で終了しました。`);
    return 1;
  }
  return 0;
};

let exitCode = 0;
if (existsSync(localBinary)) {
  exitCode = runCommand(localBinary, [command, ...extraArgs]);
} else {
  console.warn('react-scriptsがローカルに見つからないため、npxで取得して実行します。');
  exitCode = runCommand('npx', ['--yes', `react-scripts@${REACT_SCRIPTS_VERSION}`, command, ...extraArgs]);
}

process.exit(exitCode);
