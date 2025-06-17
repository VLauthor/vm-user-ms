#!/usr/bin/env node
const fs = require('fs');
const { execSync } = require('child_process');

function getCurrentBranch() {
  try {
    return execSync('git branch --show-current').toString().trim();
  } catch {
    return "main";
  }
}

function getMergeBranch() {
  try {
    const msg = fs.readFileSync(process.argv[2], 'utf8');
    const match = msg.match(/Merge branch '(.+?)'/);
    return match ? match[1] : "feature";
  } catch {
    return "feature";
  }
}

const msgFile = process.argv[2];
const operation = process.argv[3];

if (operation === 'merge') {
  const currentBranch = getCurrentBranch();
  const mergeBranch = getMergeBranch();
  
  const commitMessage = `merge(${currentBranch}): merge ${mergeBranch}\n`;
  fs.writeFileSync(msgFile, commitMessage);
}
