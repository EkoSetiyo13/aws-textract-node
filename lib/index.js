const fs = require("fs");
const path = require("path");
const {
  AnalyzeDocumentCommand,
  TextractClient,
} = require("@aws-sdk/client-textract");

exports.printMsg = function () {
  console.log("Node.js is awesome!");
};

async function TextractProcess({
  pathFile,
  aws_region,
  aws_access_key_id,
  aws_secret_access_key,
}) {
  const client = new TextractClient({
    region: aws_region,
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
  });
  const datafs = fs.readFileSync(pathFile);
  const params = {
    //** input parameters *//
    Document: {
      Bytes: Buffer.from(datafs),
    },
    FeatureTypes: ["FORMS"],
  };

  // async/await.
  try {
    const command = new AnalyzeDocumentCommand(params);
    const responeTextract = await client.send(command);
    return responeTextract;
  } catch (error) {
    return error;
  }
}

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

function getValue(props) {
  const { source, key, next = 1 } = props;
  let result = {};
  let keyObj = 0;
  for (let obj of source["Blocks"]) {
    if (obj?.hasOwnProperty("Text")) {
      if (obj["Text"].includes(key)) {
        result.key = key;
        result.value = source["Blocks"][keyObj + 1 + next]["Text"];
      }
      keyObj += 1;
    }
  }

  return result;
}

exports.awsTextract = { TextractProcess, getValue, getTextJump };
