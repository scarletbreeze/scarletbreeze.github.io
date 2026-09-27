#!/usr/bin/env python3
"""기존 Jekyll 블로그(_posts)를 content/archive/<year>/<slug>.md 로 옮긴다.

사용: python3 scripts/migrate_legacy_posts.py <옛 블로그 클론 경로>
- front matter를 title/date/tags/categories/legacy_path 로 정규화
- 로컬 이미지(/assets/…, /images/…, github blob 링크)를 public/legacy/ 로 복사하고 경로 재작성
- data/archive/index.json 생성 (목록 화면용 메타)
일회성 스크립트. 재실행 시 content/archive, public/legacy, index.json 을 덮어쓴다.
"""
import json, re, shutil, sys, unicodedata
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]).resolve()
OUT_CONTENT = ROOT / 'content' / 'archive'
OUT_IMG = ROOT / 'public' / 'legacy'
OUT_INDEX = ROOT / 'data' / 'archive' / 'index.json'

FM_RE = re.compile(r'^---\s*\n(.*?)\n---\s*\n', re.S)
FNAME_RE = re.compile(r'^(\d{4})-(\d{2})-(\d{2})-(.+?)(?:\.md|\.markdown)+\s*$')
GH_BLOB = re.compile(r'https://github\.com/scarletbreeze/scarletbreeze\.github\.io/blob/master/(images/[^)\s"]+?)(?:\?raw=true[a-z]*)?(?=[)\s"])')
LOCAL_IMG = re.compile(r'(\]\(|src=")(/(?:assets|images)/[^)\s"]+)')


def parse_front_matter(text):
    m = FM_RE.match(text)
    if not m:
        return {}, text
    fm = {}
    for line in m.group(1).splitlines():
        if ':' not in line:
            continue
        k, v = line.split(':', 1)
        fm[k.strip()] = v.strip()
    return fm, text[m.end():]


def parse_list(v):
    if not v:
        return []
    v = v.strip()
    if v.startswith('['):
        v = v.strip('[]')
    return [t.strip().strip('"\'') for t in re.split(r'[,\s]+', v) if t.strip().strip('"\'')]


def slugify(title):
    s = unicodedata.normalize('NFC', title)
    s = re.sub(r'[\s_]+', '-', s)
    s = re.sub(r'[^\w\-가-힣]', '', s)
    s = re.sub(r'-{2,}', '-', s).strip('-')
    return s.lower() or 'post'


def copy_image(rel):
    rel = unquote(rel).lstrip('/')
    src = SRC / rel
    if not src.exists():
        return None
    dst = OUT_IMG / rel
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)
    return '/legacy/' + rel


def rewrite_images(body, stats):
    def gh(m):
        new = copy_image(m.group(1))
        stats['gh' if new else 'missing'] += 1
        return new or m.group(0)
    body = GH_BLOB.sub(gh, body)

    def local(m):
        new = copy_image(m.group(2))
        stats['local' if new else 'missing'] += 1
        return m.group(1) + (new or m.group(2))
    return LOCAL_IMG.sub(local, body)


def main():
    if OUT_CONTENT.exists():
        shutil.rmtree(OUT_CONTENT)
    if OUT_IMG.exists():
        shutil.rmtree(OUT_IMG)
    OUT_INDEX.parent.mkdir(parents=True, exist_ok=True)

    index, seen, stats = [], set(), {'gh': 0, 'local': 0, 'missing': 0}
    for f in sorted((SRC / '_posts').iterdir()):
        m = FNAME_RE.match(f.name)
        if not m:
            print('skip (이름 형식 불일치):', f.name)
            continue
        year, month, day, raw_title = m.groups()
        text = f.read_text(encoding='utf-8', errors='replace')
        fm, body = parse_front_matter(text)
        title = fm.get('title', '').strip('"\'') or raw_title.strip()
        date = f'{year}-{month}-{day}'
        tags = sorted(set(parse_list(fm.get('tags')) + parse_list(fm.get('tag'))))
        categories = parse_list(fm.get('categories'))
        slug = f'{date}-{slugify(raw_title)}'
        n = 2
        while slug in seen:
            slug = f'{date}-{slugify(raw_title)}-{n}'; n += 1
        seen.add(slug)

        body = rewrite_images(body.strip() + '\n', stats)
        legacy_path = f'/articles/{year}-{month}/{slugify(title)}'
        front = ['---', f'title: {json.dumps(title, ensure_ascii=False)}', f'date: {date}',
                 f'tags: {json.dumps(tags, ensure_ascii=False)}',
                 f'categories: {json.dumps(categories, ensure_ascii=False)}',
                 f'legacy_path: {json.dumps(legacy_path, ensure_ascii=False)}', '---', '']
        out = OUT_CONTENT / year / f'{slug}.md'
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text('\n'.join(front) + body, encoding='utf-8')
        index.append({'slug': slug, 'title': title, 'date': date, 'year': int(year),
                      'tags': tags, 'categories': categories, 'file': f'{year}/{slug}.md'})

    index.sort(key=lambda p: p['date'], reverse=True)
    OUT_INDEX.write_text(json.dumps({
        'source': 'scarletbreeze/scarletbreeze.github.io (Jekyll, 2017–2019) — migrated 2026-09-28',
        'count': len(index), 'posts': index}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'posts: {len(index)}  images copied: gh={stats["gh"]} local={stats["local"]} missing={stats["missing"]}')


if __name__ == '__main__':
    main()
