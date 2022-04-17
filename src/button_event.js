const fs = require("fs-extra");

const path = require("path");
const exec = require("child_process").exec;
const iconv = require("iconv-lite");

const zylfd = document.getElementById("zylfd").value;
const templateDir1 = `${__dirname}/template/analyze.MomentCurvature2D.tcl`;
const templateDir2 = `${__dirname}/template/build.RCSection.Rect2D.tcl`;
const templateDir3 = `${__dirname}/template/MomentCurvature2D.tcl`;
const templateDir4 = `${__dirname}/template/c.tcl`;
const templateDir5 = `${__dirname}/template/Units.tcl`;

const resultDir = "result";
const fileList = [];

async function createFile() {
  const basePath = "tcl";
  try {
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath);
    }
    fs.writeFileSync(
      basePath + "/Units.tcl",
      makeContent(0, templateDir5),
      { flag: "w+" },
      (err) => {}
    );
    for (let i = 0; i < Number(zylfd); i++) {
      fs.writeFileSync(
        basePath + "/analyze.MomentCurvature2D" + i + ".tcl",
        makeContent(i, templateDir1),
        { flag: "w+" },
        (err) => {}
      );
      fs.writeFileSync(
        basePath + "/build.RCSection.Rect2D" + i + ".tcl",
        makeContent(i, templateDir2),
        { flag: "w+" },
        (err) => {}
      );
      fs.writeFileSync(
        basePath + "/MomentCurvature2D" + i + ".tcl",
        makeContent(i, templateDir3),
        { flag: "w+" },
        (err) => {}
      );
      fs.writeFileSync(
        basePath + "/c" + i + ".tcl",
        makeContent(i, templateDir4),
        { flag: "w+" },
        (err) => {}
      );
      fileList.push(basePath + "/c" + i + ".tcl");
    }
  } catch (err) {
    console.error(err);
  }
}
function makeContent(index, file_path) {
  let file = fs.readFileSync(file_path, "utf-8");
  file = file.replace("@resultFile@", "result" + index);
  file = file.replace("@resultFile@", "result" + index);
  file = file.replace("@jxqd@", document.getElementById("jxqd").value);
  file = file.replace("@jxqdyb@", document.getElementById("jxqdyb").value);
  file = file.replace("@cyqd@", document.getElementById("cyqd").value);
  file = file.replace("@cyqdyb@", document.getElementById("cyqdyb").value);
  file = file.replace("@jxqd2@", document.getElementById("jxqd2").value);
  file = file.replace("@jxqdyb2@", document.getElementById("jxqdyb2").value);
  file = file.replace("@cyqd2@", document.getElementById("cyqd2").value);
  file = file.replace("@cyqdyb2@", document.getElementById("cyqdyb2").value);
  file = file.replace("@qfqd@", document.getElementById("qfqd").value);
  file = file.replace("@txmx@", document.getElementById("txmx").value);
  file = file.replace("@yhqd@", document.getElementById("yhqd").value);
  file = file.replace("@jmkdb@", document.getElementById("jmkdb").value);
  file = file.replace("@jmkdh@", document.getElementById("jmkdh").value);
  file = file.replace("@gjzbj@", document.getElementById("gjzbj").value);
  file = file.replace("@tfxgj@", document.getElementById("tfxgj").value);
  file = file.replace("@tfxgjz@", document.getElementById("tfxgjz").value);
  file = file.replace("@bfxgj@", document.getElementById("bfxgj").value);
  file = file.replace("@bfxgjz@", document.getElementById("bfxgjz").value);
  file = file.replace("@mfxgj@", document.getElementById("mfxgj").value);
  file = file.replace("@mfxgjz@", document.getElementById("mfxgjz").value);
  file = file.replace(
    "@hxqhfdydxx@",
    document.getElementById("hxqhfdydxx").value
  );
  file = file.replace(
    "@hxqhfdydxy@",
    document.getElementById("hxqhfdydxy").value
  );
  file = file.replace(
    "@bhchfdydxx@",
    document.getElementById("bhchfdydxx").value
  );
  file = file.replace(
    "@bhchfdydxy@",
    document.getElementById("bhchfdydxy").value
  );
  file = file.replace(
    "@sjzl@",
    (Number(document.getElementById("sjzl").value) * index) /
      Number(document.getElementById("zylfd").value)
  );
  file = file.replace("@wjfxjd@", document.getElementById("wjfxjd").value);
  file = file.replace("@zdqlxz@", document.getElementById("zdqlxz").value);
  file = file.replace("@zylfd@", document.getElementById("zylfd").value);
  file = file.replace("@zdzl@", document.getElementById("zdzl").value);
  file = file.replace("@index@", index);
  file = file.replace("@index@", index);

  return file;
}

async function doOpensess() {
  if (fs.existsSync(resultDir)) {
    fs.removeSync(resultDir);
    console.log("deleteDir");
  }
  if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir);
  }
  for (const tclFile of fileList) {
    let cmd = `${__dirname}/OpenSees/bin/OpenSees ` + tclFile;
    exec(cmd, { encoding: "binary" }, (error, stdout, stderr) => {
      console.log(iconv.decode(new Buffer(stderr, "binary"), "cp936"));
      console.log(iconv.decode(new Buffer(stdout, "binary"), "cp936"));
    });
  }
}
const isFile = (filename) => {
  return fs.lstatSync(filename).isFile();
};
async function makeOrigin() {
  const result = [];
  const fileList = (await fs.readdir(resultDir))
    .filter((filename) => filename.split("-").length > 1)
    .map((filename) => path.join(resultDir, filename))
    .filter(isFile);

  for (const file of fileList) {
    let index = Number(file.split("-")[0].substring(13));
    debugger;
    const zl =
      -(Number(document.getElementById("sjzl").value) * index) /
      Number(document.getElementById("zylfd").value);
    let fileStr = fs.readFileSync(file, "utf-8");
    let valueList = [];
    const limit = Number(document.getElementById("cyqdyb2").value);
    for (const value of fileStr.split("\r\n")) {
      const lineSplit = value.split(" ");
      if (Number(lineSplit[2]) >= limit) {
        valueList.push(toD(lineSplit[0]));
      } else {
        break;
      }
    }
    const max = Math.max(...valueList);
    result.push({ x: max, y: zl });
  }
  result.sort((l, r) => {
    return l.y - r.y;
  });
  console.log(result);
}
async function caculateExtra() {
  document.getElementById("zdzl").value =
    Number(document.getElementById("jmkdb").value) *
    Number(document.getElementById("jmkdh").value);
}

function toD(val) {
  const e = String(val);
  let rex = /^([0-9])\.?([0-9]*)e-([0-9])/;
  if (!rex.test(e)) return parseFloat(val);
  const numArr = e.match(rex);
  const n = Number("" + numArr[1] + (numArr[2] || ""));
  const num = "0." + String(Math.pow(10, Number(numArr[3]) - 1)).substr(1) + n;
  return parseFloat(num.replace(/0*$/, "")); // 防止可能出现0.0001540000000的情况
}

export { createFile, doOpensess, makeOrigin, caculateExtra };
