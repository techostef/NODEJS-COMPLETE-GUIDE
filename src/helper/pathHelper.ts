import path from "path";

const getSrcDir = path.dirname(require?.main?.filename ?? '');

const pathHelper = {
  getSrcDir,
}

export default pathHelper;