import Quiz from "../model/Quiz.js";

export const create = async (req, res) => {
  try {
    const { question, A, B, C, D, correct, class_id, chapter, lesson_id } =
      req.body;

    const userId = req.userId;

    const document = new Quiz({
      question,
      A,
      B,
      C,
      D,
      correct,
      lesson: lesson_id,
      chapter,
      classroom: class_id,
      teacher: userId,
    });

    const quiz = await document.save();

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const all = async (req, res) => {
  try {
    const quizs = await Quiz.find();
    res.status(200).json(quizs);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
