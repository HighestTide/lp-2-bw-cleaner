import { parse } from "./deps.ts";
import { readLastPassFile } from "./lastpass.ts";
import { exitErr, tryOpenFile, tryWriteCsv } from "./tryIO.ts";
const {
  file,
  "out-compatible": outCompatible = "./bw-compatible-entries.csv",
  "out-incompatible": outIncompatible = "./bw-incompatible-entries.csv",
} = parse(Deno.args);

// Would be === true with just `--file`
if (!file || file === true) {
  exitErr(
    `Usage: lpass-bw-fixer --file lastpass_export.csv [--out-compatible ./bw-compatible-entries.csv] [--out-incompatible ./bw-incompatible-entries.csv] [--verbose]`,
  );
}

const lastpassCsv = await tryOpenFile(`${file}`);
console.log(`Reading entries from '${file}'`);
const { compatible, incompatible } = await readLastPassFile(lastpassCsv);
lastpassCsv.close();

// -2 because headers.
const totalEntries = compatible.length + incompatible.length - 2;
console.log(
  `Read ${totalEntries} entries, ${incompatible.length -
    1} of which can not be imported to Bitwarden.`,
);

await tryWriteCsv(outCompatible, compatible);
console.log(
  `Wrote ${compatible.length - 1} compatible entries to '${outCompatible}'.`,
);

await tryWriteCsv(outIncompatible, incompatible);
console.log(
  `Wrote ${incompatible.length -
    1} incompatible entries to '${outIncompatible}'.`,
);
