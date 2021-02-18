# LastPass to Bitwarden cleaner

### A simple script to filter lastpass exports to find data incompatible with BitWarden imports


## Why?
With the recent (As of Feb. 18, 2021) LastPass policy change for using multiple devices on the free tier, I wanted to transfer my data to Bitwarden. However, several entries in my LastPass vault prevented the import from working properly. I could have just found/fixed those ~30 entries by hand and pretended it never happened, but instead I wrote this.

There might be other projects that do this exact thing, I have to admit I didn't really check.

As to why Bitwarden has a character limit that is low enough to *hit*, I have no good answer.

## What?
lp-2-bw-cleaner is a simple Deno program that reads a LastPass .csv export and splits it into a "compatible" and an "incompatible" files, letting you import the working data to Bitwarden easily and leaving you with a problem to deal with in the form of your un-welcome data. 

Currently it only checks that the `extra` field does not exceed 9999 characters, since this is the only issue I found with my export. If you try this and it doesn't solve your issue, please see [Contributing](#contributing)



## How?

Using the executable: 
`lp-2-bw-cleaner --file lastpass_export.csv [--verbose] [--out-incompatible ./incompatible.csv] [--out-compatible ./compatible.csv]`

Using Deno: `deno run --unstable --allow-read --allow-write mod.ts --file lastpass_export.csv [--verbose] [--out-incompatible ./incompatible.csv] [--out-compatible ./compatible.csv]`

## Safety

The executable provided in releases here is the output of `deno compile --unstable --allow-read --allow-write mod.ts`, but obviously you are free to and **encouraged** to inspect the source code and do this yourself, considering you are trusting this code with the keys to the kingdom. Compiling/running this code with those `deno --allow-*` flags means this code is unable to, for example, send your passwords to me over the internet. 


## Contributing

If there are other issues that prevent a LastPass export from being imported to Bitwarden, it would be great if you let me know or open a pull request adding a check to `lastPassEntryIsSafe` in `lastpass.ts` 

(This is an extremely simple project, you probably don't need to know what Deno is or how TypeScript works :) )