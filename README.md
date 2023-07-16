# AWS TEXTRACT

Simple Textract PDF and Image File

### Install

```
$ npm install aws-textract-node
```

## Usage

```javascript
let config = {
    aws_region: xxx,
    aws_access_key_id: xxx,
    aws_secret_access_key: xxx,
};

const data = await awsTextract.TextractProcess({
    ...config,
    pathFile: xxx,
});
```

## Example

<img src="https://github.com/EkoSetiyo13/aws-textract-node/blob/main/test/example.jpeg" width="250" height="250">

```javascript
let config = {
    aws_region: xxx,
    aws_access_key_id: xxx,
    aws_secret_access_key: xxx,
};

const data = await awsTextract.TextractProcess({
    ...config,
    pathFile: "./test/example.jpeg",
});

const line = awsTextract.getValue(data, "Total");
// { key: 'Total', value: '$115.00' }
```

## Helper

| No | Function    | Description    | Params    |
| :---:   | :---: | :---: | :--- |
| 1 |  `getValue()`   | Get Word (Value) From Another Word (Key)  | `source` : data from textract [array], <br> `key` : keyword [string], <br>`next` : if between the key and value there is word, default next=1 [integer] |


### Roadmap

- [x] Using AnalyzeDocumentCommand.
- [x] Function Helper (getValue)
- [ ] ..

### Contributing

1. Eko Setiyo Budi Purnomo (eko.setiyobp@gmail.com)
