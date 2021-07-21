export function fetchGBK (url: string) {
  return fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      let decoder = new TextDecoder("GBK");
      let text = decoder.decode(buffer);
      return text
    });
}

export function fetchGBK2 (url: string) {
  return fetch(url)
  .then(res=> res.blob())
  .then(blob => new Promise(resolve => {
    {
      const reader = new FileReader();
      reader.onload = function(e) {
        resolve(reader.result)
      }
      reader.readAsText(blob, 'GBK')
  }
  }))
}

export function parseNovel (txt: string): { contents: string[], chapters: string[]} {
  const reg = /第[零一二三四五六七八九十0-9]+[章节卷集部篇回][\s]*[\S]+/g;
  const chapters = txt.match(reg) as string[];
  let i = 0;
  const contents: string[] = []
  if (!chapters) return { contents, chapters }
  while(i < chapters.length && chapters) {
    const segments = txt.split(chapters[i])
    contents.push(segments[0])
    txt = chapters[i] + segments[1]
    i += 1
  }
  contents.push(txt)
  chapters.unshift('介绍')
  return {
    contents,
    chapters
  }
}