import Employee from "../model/Employee.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import config from 'config'

export const registration = async (req, res) => {
    try {
        const {email, password, lastname, firstname, patronymic, phoneNumber, role} = req.body
        
        const salt = await bcrypt.genSalt(6);

        const hash = await bcrypt.hash(password, salt);

        const isEmailExist = await Employee.findOne({
            email: email
        })
    
        if(isEmailExist) {
            return res.status(400).json({
                message: 'Қызметкер желіде тіркелген'
            })
        }

        const document = new Employee({
            email,
            hashedPassword: hash,
            lastname,
            firstname,
            patronymic,
            phone: phoneNumber,
            role
        })

        const employee = await document.save()

        const { hashedPassword, ...userData } = employee._doc;

        const token = jwt.sign(
          {
            _id: employee._id,
          },
          config.get("jwt_key"),
          { expiresIn: "1h" }
        );
    
        res.status(200).json({
          userData,
          token,
        });

    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const login = async (req, res) => {
    try {
        const {login, password} = req.body

        let employee = ''

        const validateEmail = (email) => {
            return email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
          };

          if (validateEmail(login)) {
            employee = await Employee.findOne({
                email: login
            }).populate('subject').exec()
            if (!employee) {
                return res.status(404).json({
                  message: `Қызметкер: '${login}' желіде жоқ`,
                });
              }
        } else {
            employee = await Employee.findOne({
                phone: login
            }).populate('subject').exec()
            if (!employee) {
                return res.status(404).json({
                  message: `Қызметкер: '${login}' желіде жоқ`,
                });
              }
        }


    const isPassValid = await bcrypt.compare(
        password,
        employee._doc.hashedPassword
      );
  
      if (!isPassValid) {
        return res.status(400).json({
          message: "Құпия сөз қате терілген",
        });
      }

      const token = jwt.sign(
        {
          _id: employee._id,
        },
        config.get("jwt_key"),
        {
          expiresIn: "1h",
        }
      );
  
      const { hashedPassword, ...userData } = employee._doc;
  
      res.status(200).json({
        ...userData,
        token,
      });
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const me = async (req, res) => {
    try {
        const userId = req.userId

        const employee = await Employee.findById(userId).populate('subject').exec()

        if (!employee) {
            return res.status(404).json({
                message: 'Қолданушы желіде жоқ'
            })
        }

        const {hashedPassword, ...userData} = employee._doc

        res.status(200).json(userData)

    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const update = async (req, res) => {
  try {
    const { lastname, firstname, patronymic, phone, subject } = req.body;

    const userId = req.userId

    const employee = await Employee.findById(userId)

    switch (employee.role) {
      case 'teacher': 
        await Employee.updateOne(
          {
            _id: employee._id,
          },
          {
            lastname, firstname, patronymic, phone, subject
          }
        );
      break;
      case 'moderator': 
      await Employee.updateOne(
        {
          _id: employee._id,
        },
        {
          lastname, firstname, patronymic, phone
        }
      );
      break;

    }




    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const all = async (req, res) => {
  try {

    const employees = await Employee.find()
    .populate("classrooms")
    .populate("subject")
    .exec();

    res.status(200).json(employees);

  } catch (error) {

    res.status(500).json(error.message);
  }
};
