# AWS TEXTRACT

Simple Textract PDF and Image File

### Tech Stack

- Javascript (Node JS)

### Install

```
$ npm install aws-textract-node
```

## Usage
![example](https://github.com/EkoSetiyo13/aws-textract-node/assets/32205313/fd3a3ad7-7589-4333-be31-42157043ac57)

```javascript
let config = {
    aws_region: AWS_REGION,
    aws_access_key_id: AWS_ACCESS_KEY_ID,
    aws_secret_access_key: AWS_SECRET_ACCESS_KEY,
};

const data = await awsTextract.TextractProcess({
    ...config,
    pathFile: "./test/example.jpeg",
});

const line = awsTextract.getValue(data, "Total");
// { key: 'Total', value: '$115.00' }
```

### Roadmap

- [x] Using AnalyzeDocumentCommand.
- [x] Function Helper (getValue)
- [ ]

### Contributing

Developed By
Eko Setiyo Budi Purnomo
