import test from 'node:test';
import assert from 'node:assert/strict';
import { historyExercises } from '../src/content/index.js';
import { dateAnswerShape, historyDateChoices } from '../src/content/history-date-options.js';

test('approximate and exact dates never mix, including alternate approximation spellings', () => {
  const pool = ['1550', '1540', '1560', '1570', '1580', 'około 1540', 'ok 1560', 'ok.1570'];
  const approximate = historyDateChoices('Ok. 1550', pool);
  assert.equal(approximate.length, 5);
  for (const option of approximate) assert.match(option, /^Ok\. \d{4}$/u);
  assert.ok(approximate.includes('Ok. 1540'));
  for (const option of historyDateChoices('1550', pool)) assert.match(option, /^\d{4}$/u);
  for (const option of historyDateChoices('ok 956r; 997; 999; 1000', pool)) {
    assert.match(option, /^ok \d{3,4}r; \d{3,4}; \d{3,4}; \d{3,4}$/u);
  }
  assert.notEqual(dateAnswerShape('około 1550'), dateAnswerShape('1550'));
});

test('every date question has five distinct answers with matching date structure', () => {
  const questions = historyExercises.filter(
    (item) => item.historyTestType !== 'context' && item.level === 'choice',
  );
  assert.equal(questions.length, 152);
  for (const question of questions) {
    assert.equal(new Set(question.options).size, 5, question.id);
    assert.equal(
      question.options.filter((option) => option === question.answers[0]).length,
      1,
      question.id,
    );
    for (const option of question.options) {
      assert.equal(
        dateAnswerShape(option),
        dateAnswerShape(question.answers[0]),
        `${question.id}: ${option}`,
      );
    }
  }
});

test('range and multiple-date alternatives never use standalone years', () => {
  const pool = ['966', '1226', '1772', '1793', '1795', '1918', '1989'];
  for (const option of historyDateChoices('1772,1793,1795', pool)) {
    assert.match(option, /^\d{4},\d{4},\d{4}$/u);
    const years = option.split(',').map(Number);
    assert.ok(years[0] < years[1] && years[1] < years[2]);
  }
  for (const option of historyDateChoices('1569-1795; 1918-1939; 1989', pool)) {
    assert.match(option, /^\d{4}-\d{4}; \d{4}-\d{4}; \d{4}$/u);
  }
  for (const option of historyDateChoices('1838-1893', pool)) {
    assert.match(option, /^\d{4}-\d{4}$/u);
    const [start, end] = option.split('-').map(Number);
    assert.ok(end > start);
  }
});

test('date shape preserves precision and handles Polish month endings', () => {
  assert.equal(dateAnswerShape('sierpień 1980'), dateAnswerShape('maj 1980'));
  assert.equal(dateAnswerShape('12 maja 1364'), dateAnswerShape('1 września 1939'));
  assert.notEqual(dateAnswerShape('12 maja 1364'), dateAnswerShape('1364'));
  assert.notEqual(dateAnswerShape('1772,1793,1795'), dateAnswerShape('1772-1795'));
});
