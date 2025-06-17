#!/usr/bin/env node
const fs = require('fs');

const msgFile = process.argv[2];
const msgSource = process.argv[3];

if (msgSource === 'message') return;

try {
  const originalMsg = fs.readFileSync(msgFile, 'utf8').trim();

  if (!originalMsg.includes('\n\n')) {
    const [type] = originalMsg.match(/^[a-z]+/) || ['chore'];

    const descriptions = {
      feat: 'Новая функциональность',
      fix: 'Исправление ошибки',
      docs: 'Обновление документации',
      refactor: 'Рефакторинг кода',
      test: 'Тесты',
      chore: 'Обновление зависимостей',
    };

    const description =
      descriptions[type] || 'Автоматически сгенерированное описание';

    // Добавляем JIRA-номер если есть в ветке
    const branchName = require('child_process')
      .execSync('git branch --show-current')
      .toString()
      .trim();

    const jiraMatch = branchName.match(/([A-Z]+-\d+)/);
    const jiraRef = jiraMatch ? `\nRefs: ${jiraMatch[0]}` : '';

    fs.writeFileSync(msgFile, `${originalMsg}\n\n${description}${jiraRef}`);
  }
} catch (error) {
  console.error('Error:', error.message);
}
