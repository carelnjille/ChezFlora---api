"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backupDatabase = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const backupDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const backupPath = path_1.default.join(__dirname, '../../backups');
    if (!fs_1.default.existsSync(backupPath)) {
        fs_1.default.mkdirSync(backupPath);
    }
    const backupFile = path_1.default.join(backupPath, `backup-${Date.now()}.sql`);
    const command = `pg_dump -U ${process.env.DB_USER} -h ${process.env.DB_HOST} -p ${process.env.DB_PORT} -d ${process.env.DB_NAME} > ${backupFile}`;
    (0, child_process_1.exec)(command, (error) => {
        if (error) {
            console.error('Error backing up database:', error);
        }
        else {
            console.log('Backup completed successfully');
        }
    });
});
exports.backupDatabase = backupDatabase;
