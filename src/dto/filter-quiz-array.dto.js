class FilterQuizDto {
  static filterQuizArray(quizArray) {
    const array = [];
    quizArray.forEach((item) => {
      array.push({
        quizId: item.quizId,
        score: item.score,
        title: item.quiz[0].title,
        image: item.quiz[0].image
      });
    });
    return array;
  }

  static filterQuizList(quizArray) {
    const array = [];
    quizArray.forEach((item) => {
      array.push({
        userId: item.userId,
        title: item.title,
        questionIds: item.questionIds,
        description: item.description,
        image: item.image,
        status: item.status,
        id: item._id,
        user: item.user,
        questions: item.questions
      });
    });
    return array;
  }
}

export default FilterQuizDto;
