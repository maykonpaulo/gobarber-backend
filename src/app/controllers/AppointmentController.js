import * as Yup from 'yup';

import Appointment from '../models/Appointment';

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.numbber().required(),
      date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const appointment = await Appointment.create(req.body);

    return res.json(appointment);
  }
}

export default new AppointmentController();
