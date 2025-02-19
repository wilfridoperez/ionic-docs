import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/';

export default (code: string, info: string) => {
  const [lang] = info.split(/\s+/).map(s => s.toLowerCase());
  const isShell = shells.includes(lang);
  const language = isShell ? 'shell' : lang;

  if (Prism.languages[language] == null) {
    return `<docs-code language=${language}>${escape(code)}</docs-code>`;
  }

  return (
    `<docs-code language="${language}">${Prism.highlight(code, language ? Prism.languages[language] : null)}</docs-code>`
  );
};

loadLanguages([
  'bash',
  'json',
  'tsx',
  'typescript'
]);

// `shell` is an alias of `bash`, so we have to extend `bash`.
Prism.languages.bash['prompt'] = /^\s*[\$#]\s+/gm;

const shells = [
  'shell',
  'bash',
  'sh'
];

const escape = (code: string) =>
  code.replace(/[&<>"']/g, (char) => escapeMap[char]);

const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#39;'
};
