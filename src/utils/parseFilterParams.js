function parseIsFavourite(value) {
  if (typeof value === 'undefined') return undefined;

  const parse = String(value).toLowerCase();
  if (parse === 'true') return true;
  if (parse === 'false') return false;

  return undefined;
}

function parseType(value) {
  if (typeof value === 'undefined') return undefined;

  const contactType = ['work', 'home', 'personal'];
  if (contactType.includes(value)) return value;

  return undefined;
}
export function parseFilterParams(query) {
  const { isFavourite, type } = query;

  const parsedIsFavourite = parseIsFavourite(isFavourite);
  const parsedType = parseType(type);

  const filter = {};

  if (typeof parsedIsFavourite === 'boolean') {
    filter.isFavourite = parsedIsFavourite;
  }

  if (parsedType !== undefined) {
    filter.contactType = parsedType;
  }

  return filter;
}
