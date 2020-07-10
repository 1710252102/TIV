 
export default function(params) {
  let data=JSON.parse(params.body)
  let demoList
  if (data.username == "admin" && data.password == "123456") {
    demoList = {
      status: 200,
      message: "success",
      data: {
        username: "admin",
        password: "123456",
        token: "123456"
      }
    }
  }else{
    demoList = {
      status: 404,
      message: "error",
    }
  }
  return demoList;
}