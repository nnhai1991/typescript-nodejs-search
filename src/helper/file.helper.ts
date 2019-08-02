import fs from "fs";

const ROOT_DATA_FOLDER = "data";

class FileHelper {
    public readDataFile(filename, callback: (err: NodeJS.ErrnoException | null, data: string) => void): void {
        fs.readFile(`${ROOT_DATA_FOLDER}/${filename}`, "utf8", callback);
    }
}

export default FileHelper;
