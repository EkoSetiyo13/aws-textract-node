# AWS TEXTRACT

Simple Textract PDF and Image File

### Tech Stack

- Javascript (Node JS)

### Install

```
$ npm install aws-textract-node
```

## Usage
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
```

### Roadmap

- [x] Using AnalyzeDocumentCommand.
- [x] Function Helper (getValue)
- [ ]

### Contributing

Developed By
Eko Setiyo Budi Purnomo
