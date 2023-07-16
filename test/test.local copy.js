require("dotenv").config({ path: ".env" });
const util = require("util");
const { awsTextract } = require("../lib");
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

function getTextJump(textractResult, value_similar, next) {
  let result;
  let keyObj = 0;
  for (let obj of textractResult["Blocks"]) {
    if (obj?.hasOwnProperty("Text")) {
      if (obj["Text"].includes(value_similar)) {
        result = textractResult["Blocks"][keyObj + 1 + next]["Text"];
      }
      keyObj += 1;
    }
  }
  return result;
}

function getValue(textractResult, key, next = 1) {
  let result = {};
  let keyObj = 0;
  for (let obj of textractResult["Blocks"]) {
    if (obj?.hasOwnProperty("Text")) {
      if (obj["Text"].includes(key)) {
        result.key = key;
        result.value = textractResult["Blocks"][keyObj + 1 + next]["Text"];
      }
      keyObj += 1;
    }
  }

  return result;
}

function getBlockTypeLine(textractResult) {
  let result;
  let keyObj = 0;
  //   let LineBlockType = textractResult["Blocks"].filter((e) => e.BlockType == "LINE");
  //   let WordBlockType = textractResult["Blocks"].filter((e) => e.BlockType == "WORD");

  for (let obj of textractResult["Blocks"]) {
    let resultObj = {};
    if (obj.BlockType == "LINE") {
      resultObj.Relationships;
      resultObj.key = obj.Text;
      //   result = textractResult["Blocks"][keyObj + 1];
    }
    keyObj += 1;
  }
  return result;
}

function getAllLine(textractResult) {
  let result = [];
  let keyArray = [];
  let pageArray = [];
  let valueArray = [];
  let keyObj = 0;
  for (let obj of textractResult["Blocks"]) {
    if (obj.BlockType == "PAGE") {
      pageArray = obj.Relationships[0].Ids;
      //   console.log(
      //     util.inspect(obj.Relationships[0].Ids, {
      //       showHidden: false,
      //       depth: null,
      //       colors: true,
      //     })
      //   );
    }
  }
  for (let obj of textractResult["Blocks"]) {
    // const isMatch = pageArray.find((x) => x.includes(obj.Id));
    // if (isMatch) {
    //   console.log(obj?.Text);
    // }
    if (obj?.EntityTypes && obj?.EntityTypes[0] == "VALUE") {
      keyObject = {};
      //   keyObject = obj;
    //   keyObject.value_id = obj.Relationships.find(
    //     (x) => x.Type === "VALUE"
    //   ).Ids;
      keyObject.key_id = obj.Relationships.find((x) => x.Type === "CHILD").Ids;
      keyArray = [...result, keyObject];
    }
  }

    for (let obj of keyArray) {
      let text = "";
      let key = "";
      for (let objBlock of textractResult["Blocks"]) {
        // const isValueMatch = obj.value_id.find((x) => x.includes(objBlock.Id));
        // if (isValueMatch) {
        //   key = key + " " + objBlock?.Text;
        // }

        const isMatch = obj.key_id.find((x) => x.includes(objBlock.Id));
        if (isMatch) {
          text = text + " " + objBlock?.Text;
        }
      }
      obj.Text = text;
    //   obj.Key = key;
      result = [...result, obj];
    }

  //   console.log(result);
  //   for (let obj of textractResult["Blocks"]) {
  //     if (obj.BlockType == "WORD") {
  //       // console.log(keyArray);
  //       //   console.log(obj.Id);
  //       //   console.log(obj.Text);
  //       const isMatch = keyArray.find((x) => x.key_id.includes(obj.Id));
  //       if (isMatch) {
  //         console.log(obj?.Text);
  //       }
  //       // //   console.log(data);
  //       //   resultObj = {};
  //       //   resultObj = obj;
  //       //   resultObj.value_id = obj.Relationships.find(
  //       //     (x) => x.Type === "VALUE"
  //       //   ).Ids;
  //       //   resultObj.key_id = obj.Relationships.find((x) => x.Type === "CHILD").Ids;
  //       //   result = [...result, resultObj];
  //     }
  //   }

  //   for (let obj of textractResult["Blocks"]) {
  //     if (obj.BlockType == "KEY_VALUE_SET" && obj.EntityTypes[0] == "VALUE") {
  //       valueObj = {};
  //       //   resultObj = {};
  //       //   resultObj = obj;
  //       //   resultObj.value_id = obj.Relationships.find(
  //       //     (x) => x.Type === "VALUE"
  //       //   ).Ids;
  //       //   resultObj.key_id = obj.Relationships.find((x) => x.Type === "CHILD").Ids;
  //       //   result = [...result, resultObj];
  //     }
  //   }
  return result;
}

async function test() {
  let config = {
    aws_region: AWS_REGION,
    aws_access_key_id: AWS_ACCESS_KEY_ID,
    aws_secret_access_key: AWS_SECRET_ACCESS_KEY,
  };
  const data = await awsTextract.TextractProcess({
    ...config,
    pathFile: "./test/example.jpeg",
  });
  //   const getInvoiceNumber = getTextJump(data, "Invoice number", 1);
  const line = getAllLine(data);
  //   console.log(line);
  console.log(
    util.inspect(line, { showHidden: false, depth: null, colors: true })
  );
}

test();
