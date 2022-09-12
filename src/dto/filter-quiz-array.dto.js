import config from '../config/variables.config';

class FilterQuizDto {
  static filterQuizArray(quizArray) {
    const array = [];
    quizArray.forEach((item) => {
      array.push({
        quizId: item.quizId,
        score: item.score,
        title: item.quiz[0].title,
        // image: `${config.PROTOCOL}://${config.HOST}/uploadedImage/${item.quiz[0].image}`
        image: item.quiz[0].image
      });
    });
    return array;
  }
}

export default FilterQuizDto;
