import Mock from "mockjs";
const user = Mock.mock({
  total:50,
  "rows|50": [
    {
      username: '@word(5)',
      id: '@guid',
      name: '@cname',
      password:'123456',
      email:'@email',
      phone:'13941338754'
    }
  ]
});
let userList = [];
export const getUserList = req => {

  // console.log("require1",req.body)
  let a = JSON.parse(req.body).params
  const { pagenum, pagesize, query } = a;
  let row = [];
  if (query) {
    // console.log("query :>> ", query);
    row = user.rows.filter(e => e.username.indexOf(query) != -1);
    // console.log("row :>> ", row);
  } else {
    for (
      let i = (pagenum - 1) * pagesize;
      i < pagenum * pagesize && i < user.rows.length;
      i++
    ) {
      row.push(user.rows[i]);
    }
  }
  userList = {
    status: 200,
    message: "success",
    data: {
      total: query ? row.length : user.total,
      rows: row
    }
  };
  console.log("userList",userList)
  return userList;
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

export const deleteUser = req => {
  let id = req.url.substr(7);
  let index = null;
  for (let i = 0; i < user.rows.length; i++) {
    if (id === user.rows[i].id) {
      index = i;
    }
  }
  user.rows.splice(index, 1);
  user.total--;
  return {
    status: 200,
    message: "success",
    data: {
      tags: index
    }
  };
};



