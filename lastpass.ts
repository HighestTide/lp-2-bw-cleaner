import { readCSVObjects } from "./deps.ts";
// The CSV headers for a LastPass export
interface LastPassEntry {
  url: string;
  username: string;
  password: string;
  extra: string;
  name: string;
  grouping: string;
  fav: string;
}
const headerRow = [
  "url",
  "username",
  "password",
  "extra",
  "name",
  "grouping",
  "fav",
];

function lastPassEntryIsSafe(entry: LastPassEntry): boolean {
  if (entry.extra.length > 9999) {
    return false;
  }
  return true;
}

export async function readLastPassFile(
  handle: Deno.File,
): Promise<{ compatible: string[][]; incompatible: string[][] }> {
  const bwIncompatibleEntries = [headerRow];
  const bwCompatibleEntries = [headerRow];
  const iterator = readCSVObjects(handle) as unknown as AsyncIterable<
    LastPassEntry
  >;
  for await (const obj of iterator) {
    const values = Object.values(obj);
    if (!lastPassEntryIsSafe(obj)) {
      bwIncompatibleEntries.push(values);
    } else {
      bwCompatibleEntries.push(values);
    }
  }
  return {
    compatible: bwCompatibleEntries,
    incompatible: bwIncompatibleEntries,
  };
}
