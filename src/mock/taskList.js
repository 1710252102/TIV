import Mock from "mockjs";
const ans = Mock.mock({
  total: 61,
  "rows|61": [
    {
      id: "@guid",
      task: "@ctitle",
      "project|1": [
        "东露天矿",
        "兆丰",
        "商飞",
        "虎符",
        "中煤上海院",
        "天锻项目"
      ],
      expStart: "@date()",
      expEnd: "@date()",
      realStart: "@date()",
      realEnd: "@date()",
      "children|10": [
        {
          id: "@guid",
          name: "@cname",
          "group|1": [
            "数据智能业务部",
            "企业智能业务部",
            "机器智能业务部",
            "人工智能部",
            "平台产品部",
            "项目技术部",
            "企业管理部"
          ]
        }
      ]
    }
  ]
});
let taskList = [];
export const getList = require => {
  
  require = JSON.parse(require.body);
  const { pagenum, pagesize, query } = require.parmas;
  let row = [];
  if (query) {
    console.log("query :>> ", query);
    row = ans.rows.filter(e => e.task.indexOf(query) != -1);
    console.log("row :>> ", row);
  } else {
    for (
      let i = (pagenum - 1) * pagesize;
      i < pagenum * pagesize && i < ans.rows.length;
      i++
    ) {
      row.push(ans.rows[i]);
    }
  }
  taskList = {
    status: 200,
    message: "success",
    data: {
      total: query ? row.length : ans.total,
      rows: row
    }
  };
  return taskList;
};
export const deleteTask = require => {
  let id = require.url.substr(7);
  let index = null;
  for (let i = 0; i < ans.rows.length; i++) {
    if (id === ans.rows[i].id) {
      index = i;
    }
  }
  console.log(id);
  console.log("index1 :>> ", index);
  ans.rows.splice(index, 1);
  ans.total--;
  return {
    status: 200,
    message: "success",
    data: {
      tags: index
    }
  };
};
// let tag = this.tableData.filter(item => id === item.id);
//         console.log("tag :>> ", tag);
//         this.tableData.splice(tag,1);
