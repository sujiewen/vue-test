
const fileParas = (filename) => {
  let dataDict = {}

  let tmpFNS = filename.split("##")
  if (tmpFNS.length > 1) {
    if (tmpFNS.length == 2) {
      if (tmpFNS[1].substr(0,1) == "[") {
        dataDict["flag"] = true
        dataDict["store"] = tmpFNS[0]
        dataDict["upcs"] = [tmpFNS[1]]
      }
      else {
        dataDict["flag"] = false
      }
    }
    else  {
      if(tmpFNS[tmpFNS.length -1].substr(0,1) == "[") {
        dataDict["store"] = tmpFNS[0]
        let index = 1
        let dataA = []

        do {
          dataA.push(tmpFNS[index]);
          index++
        }
        while (index < tmpFNS.length - 1)

        dataDict["upcs"] = dataA
        dataDict["flag"] = true

      }else if(tmpFNS[tmpFNS.length -2].substr(0,1) == "[") {
        let index = 1
        let dataA = []

        do {
          dataA.push(tmpFNS[index]);
          index++
        }
        while (index < tmpFNS.length - 2)

        if (dataA.length > 0) {
          dataDict["store"] = tmpFNS[0]
          dataDict["upcs"] = dataA
          dataDict["orderNo"] = tmpFNS[tmpFNS.length -1]
          dataDict["flag"] = true
        }

      }
      else {
        dataDict["flag"] = false;
      }
    }
  }
  else {
    dataDict["flag"] = false;
  }

  return dataDict;
}

export default {
  fileParas
}
