use merge::Merge;

#[derive(Merge)]
struct S {
    #[merge(skip = true)]
    field1: u8,
}

fn main() {}
