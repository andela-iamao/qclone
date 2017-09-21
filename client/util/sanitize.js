import striptags from 'striptags';

export function sanitize(content) {
  return striptags(content);
}
