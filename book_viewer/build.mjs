// build.mjs — 원고(book_draft.md)를 book-data.js(window.__BOOK_MD__)로 변환
// 사용법:  node build.mjs
// 원고 수정 후 한 번 재실행하면 뷰어가 갱신된다(완전 오프라인).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, '..', 'manuscript', 'book_draft.md');
const OUT = join(__dirname, 'book-data.js');

const md = readFileSync(SRC, 'utf8');
const js = `window.__BOOK_MD__ = ${JSON.stringify(md)};`;
writeFileSync(OUT, js, 'utf8');
console.log('book-data.js generated:', js.length, 'bytes  (md chars:', md.length + ')');
