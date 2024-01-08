import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __utilsDir = path.dirname(__filename);
const __srcDir = path.join(__utilsDir, '..');
const __proyectDir = path.join(__srcDir, '..');

export { __srcDir, __proyectDir };
