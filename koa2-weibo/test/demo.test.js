function sum(a,b) {
  return a + b
}

test('test demo',()=>{
  expect(sum(10,20)).toBe(30)
})