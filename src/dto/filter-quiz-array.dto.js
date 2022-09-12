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
}

export default FilterQuizDto;
