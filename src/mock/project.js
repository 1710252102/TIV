import Mock from "mockjs";
const project = Mock.mock({
  total:50,
  "rows|50": [
    {
      name: '@word(5)',
      id: '@guid',
      describe: '@cname',
      password:'123456',
      expStart: "@date()",
      expEnd: "@date()",
    }
  ]
});
let projectList = [];
export const getProjectList = req => {

  // console.log("require1",req.body)
  let a = JSON.parse(req.body).params
  const { pagenum, pagesize, query } = a;
  let row = [];
  if (query) {
    // console.log("query :>> ", query);
    row = project.rows.filter(e => e.name.indexOf(query) != -1);
    // console.log("row :>> ", row);
  } else {
    for (
      let i = (pagenum - 1) * pagesize;
      i < pagenum * pagesize && i < project.rows.length;
      i++
    ) {
      row.push(project.rows[i]);
    }
  }
  projectList = {
    status: 200,
    message: "success",
    data: {
      total: query ? row.length : project.total,
      rows: row
    }
  };
  console.log("projectList",projectList)
  return projectList;
};
// export const deleteTask = require => {
//   let id = require.url.substr(7);
//   let index = null;
//   for (let i = 0; i < ans.rows.length; i++) {
//     if (id === ans.rows[i].id) {
//       index = i;
//     }
//   }
//   console.log(id);
//   console.log("index1 :>> ", index);
//   ans.rows.splice(index, 1);
//   ans.total--;
//   return {
//     status: 200,
//     message: "success",
//     data: {
//       tags: index
//     }
//   };
// };
// let tag = this.tableData.filter(item => id === item.id);
//         console.log("tag :>> ", tag);
//         this.tableData.splice(tag,1);
//
// export const deleteUser = req => {
//   let id = req.url.substr(7);
//   let index = null;
//   for (let i = 0; i < user.rows.length; i++) {
//     if (id === user.rows[i].id) {
//       index = i;
//     }
//   }
//   user.rows.splice(index, 1);
//   user.total--;
//   return {
//     status: 200,
//     message: "success",
//     data: {
//       tags: index
//     }
//   };
// };



