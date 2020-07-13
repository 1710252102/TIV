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

// 获取所有任务列表
export const getList = req => {
  req = JSON.parse(req.body);
  const { pagenum, pagesize, query } = req.parmas;
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

export const deleteTask = req => {
  let id = req.url.substr(7);
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
export const addTask = req => {
  req = JSON.parse(req.body);
  // console.log(req);
  let { children, expTime, realTime, id, project, task } = req.parmas;
  console.log(children, expTime, realTime, id, project, task);
  let child = [];
  for (var i = 0; i < children.length; i++) {
    child[i] = Mock.mock({
      id: "@guid",
      name: children[i][1],
      group: children[i][0]
    });
  }
  if (id) {
    console.log("addTaskid :>> ", id);
    for (let i = 0; i < ans.rows.length; i++) {
      if (id === ans.rows[i].id) {
        let item = ans.rows[i];
        (item.id = id),
          (item.task = task),
          (item.project = project),
          (item.expStart = expTime[0]),
          (item.expEnd = expTime[1]),
          (item.realStart = realTime[0]),
          (item.realEnd = realTime[1]),
          (item.children = child);
      }
    }
  } else {
    id = Mock.mock("@guid");
    console.log(1, ans.rows.length);
    ans.total++;
    ans.rows[ans.total - 1] = {
      id: id,
      task: task,
      project: project,
      expStart: expTime[0],
      expEnd: expTime[1],
      realStart: realTime[0],
      realEnd: realTime[1],
      children: child
    };
  }

  return {
    status: 200,
    message: "success",
    data: {
      tags: ans.rows[ans.total - 1]
    }
  };
};
export const putTask = req => {
  let id = req.url.substr(7);
  for (let i = 0; i < ans.rows.length; i++) {
    if (id === ans.rows[i].id) {
      return {
        status: 200,
        message: "success",
        data: ans.rows[i]
      };
    }
  }
};
// export const getUser = () => {
//   return {
//     status: 200,
//     message: "success",
//     data: {
//       tags: ans.rows
//     }
//   };
// };
