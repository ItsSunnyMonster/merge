#[test]
#[ignore]
fn test_compile_fail() {
    let t = trybuild::TestCases::new();
    t.compile_fail("tests/compile/*.rs");
    t.pass("tests/compile_pass/*.rs");
}
