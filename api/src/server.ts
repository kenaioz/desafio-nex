import app from './app';
import config from './config/env';

import { sequelize } from './database/sequelize';

sequelize
  .sync({ alter: false })
  .then(() => {
    console.log('Database connected & models synced');
    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
