import httpService from "./http.service";

const commentEndpoint = "comment/";

const commentService = {
  createComment: async (payload) => {
    const { data } = await httpService.put(
      commentEndpoint + payload._id,
      payload
    );
    return data;
  },
  getComments: async (pageId) => {
    // принимем pageId птотому что запрашиваем комментарии именно для определнной страницы
    const { data } = await httpService.get(commentEndpoint, {
      params: {
        // метод firebase для получения комментраиев для этой страницы
        orderBy: '"pageId"',
        equalTo: `"${pageId}"` // добавили ковычки
      }
    });
    return data;
  },
  removeComment: async (commentId) => {
    const { data } = await httpService.delete(commentEndpoint + commentId);
    return data;
  }
};

export default commentService;
