// Single source of truth for the backend base URL, validated once here so a
// missing NEXT_PUBLIC_HOSTBASE_URL fails the same way everywhere it's used,
// instead of each call site handling (or not handling) the missing case
// differently.
const rawHostbase = process.env.NEXT_PUBLIC_HOSTBASE_URL;

if (!rawHostbase) {
  throw new Error(
    "NEXT_PUBLIC_HOSTBASE_URL is not set. Copy .env.example to .env.local and set it."
  );
}

// Explicit annotation, not just the narrowed type of rawHostbase: control-flow
// narrowing from the guard above isn't visible to other files importing this
// export, so without this, importers would still see `string | undefined`.
const hostbase: string = rawHostbase;

export default hostbase;
