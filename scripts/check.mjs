import assert from 'node:assert/strict';
import { loadNotes, markdown, categories } from './build.mjs';
const notes=await loadNotes();
assert.ok(notes.length>=20,'At least 20 starter notes');
for(const category of categories)assert.ok(notes.some(q=>q.category===category),`Empty category: ${category}`);
for(const q of notes){assert.ok(q.toc.length>=5);assert.ok(q.html.includes('https://'),'Missing references');}
const sample=markdown('## Test\n\n<script>alert(1)</script>\n\n`<img>`\n\n[bad](javascript:alert)\n\n```java\n<a>\n```');
assert.ok(!sample.html.includes('<script>'));assert.ok(!sample.html.includes('<img>'));assert.ok(!sample.html.includes('href="javascript:'));
console.log(`Content valid: ${notes.length} notes, ${categories.length} categories; HTML escaping passed.`);
