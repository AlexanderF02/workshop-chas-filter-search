// ====== Higher-order functions ======
export function hasOutOfStock(items) {
  return items.some(item => !item.inStock);
}
export function allAffordable(items, max) {
  return items.every(item => item.price <= max);
}
export function findByTag(items, tag) {
  return items.find(item => item.tags.includes(tag));
}
export function totalPrice(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
export function sortByName(items, direction = "asc") {
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));
  return direction === "desc" ? sorted.reverse() : sorted;
}

// ====== Regex ======
export function extractHashtags(text) {
  return text.match(/#[\wåäöÅÄÖ]+/gi) || [];
}
export function isValidSwedishZip(code) {
  return /^\d{3}\s?\d{2}$/.test(code);
}
export function maskEmails(text) {
  return text.replace(
    /([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
    (_, user, domain) => `${user[0]}***@${domain}`
  );
}

// ====== Rekursion ======
export function deepCountTags(items) {
  if (!Array.isArray(items)) return 0;
  return items.reduce(
    (sum, item) =>
      sum +
      (Array.isArray(item.tags) ? item.tags.length : 0),
    0
  );
}
export function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
export function findByIdRecursive(items, id) {
  for (const item of items) {
    if (item.id === id) return item;
  }
  return null;
}

// ====== Functional programming ======
export function setInStock(items, id, value) {
  return items.map(item =>
    item.id === id ? { ...item, inStock: value } : item
  );
}
export function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length
      ? fn(...args)
      : (...next) => curried(...args, ...next);
  };
}
export const priceAtMost = (max) => (item) => item.price <= max;


// ===== Sortera produkter på pris =====
export function sortByPrice(items, direction = "asc") {
  const sorted = [...items].sort((a, b) => a.price - b.price);
  return direction === "desc" ? sorted.reverse() : sorted;
}

// ====== Rekursiv flattenDeep ======
export function flattenDeep(arr) {
  return arr.reduce(
    (flat, item) =>
      flat.concat(Array.isArray(item) ? flattenDeep(item) : item),
    []
  );
}

// ===== compose(...fns) för att kedja funktioner ======
export function compose(...fns) {
  return (x) => fns.reduceRight((v, fn) => fn(v), x);
}