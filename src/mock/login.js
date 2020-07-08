let demoList = {
  status: 200,
  message: 'success',
  data: {
    username:'admin',
    password:"123456",
    token:"123456"
  }
};
export default {
    'post|/login': demoList
}