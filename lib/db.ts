/* Copyright (C) 2021 - 2022 b1f6c1c4
 *
 * This file is part of IPA-JFK.
 *
 * IPA-JFK is free software: you can redistribute it and/or modify it under the
 * terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3.
 *
 * IPA-JFK is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for
 * more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with IPA-JFK.  If not, see <https://www.gnu.org/licenses/>.
 */

import * as escapeStringRegexp from 'escape-string-regexp';
import * as core from './analysis';

let dictF: string;
let dict: { [key: string]: string[] };

function cache(): void {
  if (!dictF) throw new Error('No database loaded.');
  dict = {};
  dictF.split('\n').forEach((l) => {
    try {
      if (!l || l.startsWith(';;;')) return;
      const [w0, phst] = l.split('  ');
      const [, w, id] = w0.match(/^(.+?)(?:\(([0-9]+)\))?$/);
      if (!dict[w]) dict[w] = [];
      dict[w][id && +id || 0] = phst;
    } catch (e) {
      console.error('Error on line', l);
      throw e;
    }
  });
}

const norm = (w: string): string => w.trim().toUpperCase().replace(/ /g, '-');

function query(word: string): string[] {
  const w = norm(word);
  if (dict && (w in dict)) return dict[w];
  return [];
  // TODO: complete reference phoneme feature
  // if (!dictF) throw new Error('No database loaded.');
  // const regex = new RegExp(
  //   `\\b${escapeStringRegexp(w.toUpperCase())}(?:\\([0-9]+\\))?  ([A-Z0-9 ]+)\\b`,
  //   'g',
  // );
  // const res = [];
  // for (let m of dictF.matchAll(regex)) {
  //   res.push(m[1]);
  // }
  // return res;
}

export default {
  load: (file: string) => { dictF = file.replace(/_/g, '-'); },
  cache,
  query,
  process: (ph: string, word: string, phonemic: boolean, hints: { aeHint: string, syllableHint: string }) => core(ph.trim(), norm(word), phonemic, hints),
  display: core.display,
};
