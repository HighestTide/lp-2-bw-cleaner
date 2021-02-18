import { parse, writeCSV } from "./deps.ts";
const {
  verbose = false,
} = parse(Deno.args);

export function exitErr(error: string, exception?: Error) {
  console.error(error);
  if (exception && verbose) {
    console.log(exception);
  }
  Deno.exit(1);
}
export function tryOpenFile(path: string, opts?: Deno.OpenOptions) {
  const catcher = verboseCatcher(`File '${path}' could not be opened.`);
  return Deno.open(path, opts).catch(catcher) as Promise<Deno.File>;
}
export function verboseCatcher(message: string) {
  return (err: Error) => {
    exitErr(
      `${message}\n Call with --verbose to see Deno error message if you think this is wrong.`,
      err,
    );
  };
}
export async function tryWriteCsv(path: string, data: string[][]) {
  const handle = await tryOpenFile(path, {
    write: true,
    create: true,
    append: false,
  });

  return writeCSV(handle, data).catch(
    verboseCatcher(`Writing ${data.length} rows to '${path}' failed.`),
  ).then(
    () => handle.close(),
  );
}
