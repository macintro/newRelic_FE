export function removePhoneStringFormatting(searchString) {
  const removeCharactersRegex = new RegExp(`[() -]`, `ig`);
  searchString = searchString.replace(removeCharactersRegex, ``);
  return searchString;
}
