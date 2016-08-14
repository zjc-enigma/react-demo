const results = [
  { k: '12345', v: 'abcde' },
  { k: '23451', v: 'eabcd' },
  { k: '34512', v: 'cdeab' },
  { k: '12453', v: 'abde3' },
  { k: '34521', v: 'cdeba' },
];



export function showResult(){

  return {
    type: "SHOW",
    data: results,
  }
}
