let users = {
  status: 200,
  message: 'success',
  data: {
    total: 100,
    'rows|10': [{
      username: '@word(5)',
      id: '@guid',
      name: '@cname',
      password:'123456',
      // 'age|20-30': 23,
      'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师']
    }]
  }
};
export default {
  'get|/parameter/query': users
}
