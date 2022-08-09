export const user = {
  ref: 'Users',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
};

export const questions = {
  ref: 'Questions',
  localField: 'questionIds',
  foreignField: '_id'
};

export const quiz = {
  ref: 'Quizzes',
  localField: 'quizId',
  foreignField: '_id'
};
