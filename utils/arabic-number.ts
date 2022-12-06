function arabicNumber(num: number): string {
  const arabicNum: string[] = '٠١٢٣٤٥٦٧٨٩'.split('')
  const numSub: string[] = num.toString().split('')
  let returnVal: string = ''

  for(const numUnit of numSub) {
    returnVal += arabicNum[parseInt(numUnit)]
  }

  return returnVal
}

export default arabicNumber