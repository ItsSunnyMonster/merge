# v0.1.1 (2024-07-28)

- Remove the `Merge` implementation for `Option<T>`.
- Add new merge strategies:
  - `option::overwrite_none`
  - `option::recurse`
  - `hashmap::overwrite`
  - `hashmap::ignore`
  - `hashmap::recurse`
- Added ability to derive structs with lifetimes and generics.

# v0.1.0 (2020-09-01)

Initial release providing the `Merge` trait and some merge strategies in the
`bool`, `num`, `ord` and `vec` modules.
