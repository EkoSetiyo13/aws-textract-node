require("dotenv").config({ path: ".env" });
const util = require("util");
const { awsTextract } = require("aws-textract-node");
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

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
}

test();
