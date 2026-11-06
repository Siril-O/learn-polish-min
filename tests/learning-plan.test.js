import test from 'node:test';
import assert from 'node:assert/strict';
import { topicLevels, learningPlan } from '../src/learning-plan.js';
import { topics } from '../src/content/index.js';

test('all topics have valid levels and learning plan references are bilingual', () => {
  for (const topic of topics) {
    assert.ok(topicLevels[topic.id]?.length);
    assert.ok(topicLevels[topic.id].every((level) => learningPlan[level]));
  }
  for (const rows of Object.values(learningPlan)) {
    assert.equal(new Set(rows.map((row) => row.id)).size, rows.length);
    for (const row of rows) {
      assert.ok(row.title.pl && row.title.uk);
      assert.ok(['available', 'partial', 'missing'].includes(row.status));
      if (row.topic) assert.ok(topics.some((topic) => topic.id === row.topic));
      if (row.status === 'missing') assert.equal(row.topic, null);
    }
  }
});
