export function findAllTags(text: string) {
    const regex = /#(\w+)/g;
    const tags = [];
    let match;
  
    while ((match = regex.exec(text))) {
        tags.push(match[1]);
    }
  
    return tags
}