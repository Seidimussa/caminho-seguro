const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class BackupService {
  constructor() {
    this.backupDir = path.join(__dirname, '../../backups');
    this.ensureBackupDir();
  }

  ensureBackupDir() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  async createBackup() {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(this.backupDir, `backup-${timestamp}`);
      
      const uri = process.env.MONGODB_URI;
      const dbName = uri.split('/').pop().split('?')[0];

      return new Promise((resolve, reject) => {
        const mongodump = spawn('mongodump', [
          '--uri', uri,
          '--out', backupPath
        ]);

        mongodump.on('close', (code) => {
          if (code === 0) {
            console.log(`Backup created successfully: ${backupPath}`);
            this.cleanOldBackups();
            resolve(backupPath);
          } else {
            reject(new Error(`Backup failed with code ${code}`));
          }
        });

        mongodump.on('error', (error) => {
          reject(error);
        });
      });
    } catch (error) {
      console.error('Backup error:', error);
      throw error;
    }
  }

  async restoreBackup(backupPath) {
    try {
      const uri = process.env.MONGODB_URI;
      
      return new Promise((resolve, reject) => {
        const mongorestore = spawn('mongorestore', [
          '--uri', uri,
          '--drop',
          backupPath
        ]);

        mongorestore.on('close', (code) => {
          if (code === 0) {
            console.log('Backup restored successfully');
            resolve();
          } else {
            reject(new Error(`Restore failed with code ${code}`));
          }
        });

        mongorestore.on('error', (error) => {
          reject(error);
        });
      });
    } catch (error) {
      console.error('Restore error:', error);
      throw error;
    }
  }

  cleanOldBackups() {
    try {
      const files = fs.readdirSync(this.backupDir);
      const backupFiles = files
        .filter(file => file.startsWith('backup-'))
        .map(file => ({
          name: file,
          path: path.join(this.backupDir, file),
          time: fs.statSync(path.join(this.backupDir, file)).mtime
        }))
        .sort((a, b) => b.time - a.time);

      // Keep only last 7 backups
      const toDelete = backupFiles.slice(7);
      
      toDelete.forEach(backup => {
        fs.rmSync(backup.path, { recursive: true, force: true });
        console.log(`Deleted old backup: ${backup.name}`);
      });
    } catch (error) {
      console.error('Error cleaning old backups:', error);
    }
  }

  async scheduleBackups() {
    // Run backup every day at 2 AM
    const scheduleBackup = () => {
      const now = new Date();
      const nextBackup = new Date();
      nextBackup.setHours(2, 0, 0, 0);
      
      if (nextBackup <= now) {
        nextBackup.setDate(nextBackup.getDate() + 1);
      }
      
      const timeUntilBackup = nextBackup.getTime() - now.getTime();
      
      setTimeout(async () => {
        try {
          await this.createBackup();
          console.log('Scheduled backup completed');
        } catch (error) {
          console.error('Scheduled backup failed:', error);
        }
        
        // Schedule next backup
        scheduleBackup();
      }, timeUntilBackup);
    };

    scheduleBackup();
    console.log('Backup scheduler initialized');
  }

  getBackupList() {
    try {
      const files = fs.readdirSync(this.backupDir);
      return files
        .filter(file => file.startsWith('backup-'))
        .map(file => {
          const stats = fs.statSync(path.join(this.backupDir, file));
          return {
            name: file,
            size: stats.size,
            created: stats.mtime,
            path: path.join(this.backupDir, file)
          };
        })
        .sort((a, b) => b.created - a.created);
    } catch (error) {
      console.error('Error getting backup list:', error);
      return [];
    }
  }
}

module.exports = new BackupService();