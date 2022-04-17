const jx_gjhlt_tpl = [
  {
    title: "核心混凝土材料属性",
    key: "hxhntcl",
    line: [
      { title: "极限强度(MPa)", value: "35", key: "jxqd" },
      { title: "极限强度应变", value: "0.002", key: "jxqdyb" },
      { title: "残余强度(MPa)", value: "15", key: "cyqd" },
      { title: "残余强度应变", value: "0.0033", key: "cyqdyb" },
    ],
  },
  {
    title: "保护层混凝土材料属性",
    key: "bhchntcl",
    line: [
      { title: "极限强度(MPa)", value: "35", key: "jxqd" },
      { title: "极限强度应变", value: "0.002", key: "jxqdyb" },
      { title: "残余强度(MPa)", value: "15", key: "cyqd" },
      { title: "残余强度应变", value: "0.0033", key: "cyqdyb" },
    ],
  },
  {
    title: "钢筋材料属性",
    key: "gjclsx",
    line: [
      { title: "屈服强度(MPa)", value: "300", key: "qfqd" },
      { title: "弹性模型(MPa)", value: "245000", key: "txmx" },
      { title: "硬化系数", value: "0.0001", key: "yhxs" },
    ],
  },
  {
    title: "界面参数",
    key: "jmcs",
    line: [
      { title: "截面宽度B(mm)", value: "500", key: "jmkdb" },

      { title: "截面宽度H(mm)", value: "600", key: "jmkdh" },
      { title: "钢筋至边距as", value: "35", key: "gjzbj" },
      { title: "顶部方向钢筋", value: "2", key: "tbfxgj" },
      { title: "Ф", value: "20", key: "tgjdx" },
      { title: "底部方向钢筋", value: "2", key: "bbfxgj" },
      { title: "Ф", value: "20", key: "bgjdx" },
      { title: "中部方向钢筋", value: "2", key: "mbfxgj" },
      { title: "Ф", value: "20", key: "mgjdx" },
      { title: "核心区划分单元大小X", value: "35", key: "hxqhfdydxx" },
      { title: "核心区划分单元大小Y", value: "35", key: "hxqhfdydxy" },
      { title: "保护层划分单元大小X", value: "35", key: "bhchfdydxx" },
      { title: "保护层划分单元大小y", value: "35", key: "bhchfdydxy" },
    ],
  },
  {
    title: "弯矩曲率分析",
    key: "wjqlfx",
    line: [
      { title: "施加轴力", value: "-1000", key: "sjzl" },
      { title: "弯矩方向角度", value: "0", key: "wjfxjd" },
      { title: "最大曲率限值", value: "0.0002", key: "zdqlxz" },
    ],
  },
  {
    title: "MN分析",
    key: "mnfx",
    line: [{ title: "轴压力分段", value: "20", key: "zylfd" }],
  },
  {
    title: "其他",
    key: "extra",
    line: [{ title: "最大轴力", value: "", key: "zdzl" }],
  },
];

export { jx_gjhlt_tpl };
