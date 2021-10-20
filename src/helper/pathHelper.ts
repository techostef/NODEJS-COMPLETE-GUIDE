import path from "path";

const getSrcDir = path.dirname(require?.main?.filename ?? '');
const getRootDir = path.dirname(require?.main?.filename + '../' ?? '');

const pathHelper = {
  getSrcDir,
  getRootDir,
}

export default pathHelper;