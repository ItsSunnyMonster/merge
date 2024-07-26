# merge-rs

## Why This Fork

This repository was forked from https://git.sr.ht/~ireas/merge-rs. This fork started when I needed some
features that I could add very easily myself. Since the original repo wasn't hosted on GitHub, I followed
the instructions outlined in the read me file to try and get in touch with the author and suggest the features.
The repo has not been updated in around 4 years, and the author did not respond after a day. I did not have
the time to wait around, so I forked the repo to implement those features myself. Of course, if the author
replies to me, I will be more than happy to contribute my changes upstream.

### Structural Changes
- The copyright headers in files were removed.
- No longer complies by the REUSE standard.
- CI was reimplemented in GitHub Actions.

The `merge` crate provides the `Merge` trait that can be used to merge multiple
values into one:

```rust
trait Merge {
    fn merge(&mut self, other: Self);
}
```

`Merge` can be derived for structs:

<!-- should be kept in sync with examples/user.rs -->

```rust
use merge::Merge;

#[derive(Merge)]
struct User {
    // Fields with the skip attribute are skipped by Merge
    #[merge(skip)]
    pub name: &'static str,

    // The strategy attribute is used to select the merge behavior
    #[merge(strategy = merge::option::overwrite_none)]
    pub location: Option<&'static str>,

    #[merge(strategy = merge::vec::append)]
    pub groups: Vec<&'static str>,
}

let defaults = User {
name: "",
location: Some("Internet"),
groups: vec!["rust"],
};
let mut ferris = User {
name: "Ferris",
location: None,
groups: vec!["mascot"],
};
ferris.merge(defaults);

assert_eq!("Ferris", ferris.name);
assert_eq!(Some("Internet"), ferris.location);
assert_eq!(vec!["mascot", "rust"], ferris.groups);
```

A merge strategy is a function with the signature `fn merge<T>(left: &mut T,
right: T)` that merges `right` into `left`. The `merge` crate provides
strategies for the most common types, but you can also define your own
strategies.

The trait can be used to merge configuration from different sources, for
example environment variables, multiple configuration files and command-line
arguments, see the `args.rs` example.

## Features

This crate has the following features:

- `derive` (default):  Enables the derive macro for the `Merge` trait using the
  `merge_derive` crate.
- `num` (default): Enables the merge strategies in the `num` module that
  require the `num_traits` crate.
- `std` (default): Enables the merge strategies in the `hashmap` and `vec`
  modules that require the standard library. If this feature is not set,
  `merge` is a `no_std` library.

## Minimum Supported Rust Version

This crate supports Rust 1.60.0 or later.

## License

This project, including all source files, is dual-licensed under the [Apache-2.0][] and [MIT][] licenses.
The documentation and configuration files contained in this repository are
licensed under the [Creative Commons Zero][CC0] license.

[Apache-2.0]: https://opensource.org/licenses/Apache-2.0

[MIT]: https://opensource.org/licenses/MIT

[CC0]: https://creativecommons.org/publicdomain/zero/1.0/
