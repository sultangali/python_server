import Subject from "../model/Subject.js";

export const create = async (req, res) => {
    try {
        const { name, img } = req.body

        const document = new Subject({
            name,
            img
        })

        const subject = await document.save()

        res.status(200).json(subject)

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const all = async (req, res) => {
  try {
    const subjects = await Subject.find().populate('chapters').exec()
    res.status(200).json(subjects)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const remove = async (req, res) => {
    try {
        const {subjectId} = req.body
        
        Subject.findOneAndDelete(
            {
              _id: subjectId,
            },
            (err, doc) => {
              if (err) {
                return res.status(500).json({
                  message: "Пәнді өшіру кезінде қате шықты",
                });
              }
      
              if (!doc) {
                return res.status(404).json({
                  message: "Пән жүйеде жоқ",
                });
              }
              res.status(200).json({
                success: true,
              });
            }
          );
    } catch (error) {
        res.status(500).json(error.message)
    }
}