module.exports = {
  "GET /mingmouApi/api/demo/query": {
    success: true,
    code: 200,
    message: "",
    result: {
      page: 1,
      pageSize: 10,
      count: 3,
      data: [
        {
          id: 111,
          code: "movie_graph2",
          name: "豆瓣电影图谱",
          vertexCnt: 130,
          edgeCnt: 140,
          desc: "王小飞的测试",
          data: null,
          gmtCreate: "2019-05-16 03:45:33",
          gmtModify: "2019-05-16 03:45:33"
        },
        {
          id: 121,
          code: "movie_graph2",
          name: "豆瓣电影图谱",
          vertexCnt: 130,
          edgeCnt: 140,
          desc: "123321",
          data: null,
          gmtCreate: "2019-05-18 02:33:44",
          gmtModify: "2019-05-18 02:33:44"
        },
        {
          id: 131,
          code: "movie_graph2",
          name: "豆瓣电影图谱",
          vertexCnt: 21,
          edgeCnt: 28,
          desc: "好图哈哈哈",
          data: null,
          gmtCreate: "2019-05-20 13:30:01",
          gmtModify: "2019-05-20 13:30:01"
        }
      ]
    }
  },
  "POST /mingmouApi/api/demo/add": {
    success: true,
    code: 200,
    message: "",
    result: {
      id: 111,
      code: "movie_graph2",
      name: "豆瓣电影图谱",
      vertexCnt: 130,
      edgeCnt: 140,
      desc: "王小飞的测试",
      data: null,
      gmtCreate: "2019-05-16 03:45:33",
      gmtModify: "2019-05-16 03:45:33"
    }
  },
  "POST /mingmouApi/api/demo/update": {
    success: true,
    code: 200,
    message: "",
    result: {
      id: 111,
      code: "movie_graph2",
      name: "豆瓣电影图谱",
      vertexCnt: 130,
      edgeCnt: 140,
      desc: "王小飞的测试",
      data: null,
      gmtCreate: "2019-05-16 03:45:33",
      gmtModify: "2019-05-16 03:45:33"
    }
  },
  "GET /mingmouApi/api/demo/delete": {
    success: true,
    code: 200,
    message: "",
    result: {
      id: 111,
      code: "movie_graph2",
      name: "豆瓣电影图谱",
      vertexCnt: 130,
      edgeCnt: 140,
      desc: "王小飞的测试",
      data: null,
      gmtCreate: "2019-05-16 03:45:33",
      gmtModify: "2019-05-16 03:45:33"
    }
  }
};
