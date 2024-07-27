use merge::Merge;

#[derive(Merge)]
struct S<'a, T> where T: Merge {
    #[merge(skip)]
    field: &'a mut T,
}

fn main() {}