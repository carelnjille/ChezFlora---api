import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export const backupDatabase = async () => {
  const backupPath = path.join(__dirname, '../../backups');
  if (!fs.existsSync(backupPath)) {
    fs.mkdirSync(backupPath);
  }

  const backupFile = path.join(backupPath, `backup-${Date.now()}.sql`);
  const command = `pg_dump -U ${process.env.DB_USER} -h ${process.env.DB_HOST} -p ${process.env.DB_PORT} -d ${process.env.DB_NAME} > ${backupFile}`;

  exec(command, (error) => {
    if (error) {
      console.error('Error backing up database:', error);
    } else {
      console.log('Backup completed successfully');
    }
  });
};