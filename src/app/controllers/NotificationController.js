import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true } // SERVE PARA RETORNAR O NOVO CONTEUDO. SEM ESSE PARAMETRO SOMENTE SERÁ EXECUTADA A ATUALIZAÇÃO, E NÃO RETORNARÁ O NOVO CONTEÚDO.
    );

    return res.json(notification);
  }
}

export default new NotificationController();
