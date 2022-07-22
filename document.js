const fs = require('fs');
const os = require('os');

class Document {
    constructor(addr){
        this.content = '';
        // validate if is save or no
        this.isSaved = false;
        this.fileName = '';
        this.address = addr;
    }

    // validate if a file exists or no
    fileExists(name){
        return fs.existsSync(`${this.address}/${name}`);
    };

    // rewrite a file already exists
    reWriteFile(txt){
        this.content += os.EOL + txt;
        this.isSaved = false;
    };

    saveAsFile(name){
        fs.writeFileSync(
            `${this.address}/${name}`,
            this.content
        );
        this.isSaved = true;
        this.fileName = name;
    };

    saveFile(){
        fs.writeFileSync(
            `${this.address}/${this.fileName}`,
            this.content
        );
        this.isSaved = true;
        this.fileName = this.fileName;
    };

    getContent(){
        return this.content;
    };

    // if have name the file name
    hasName(){
        if(this.fileName != ''){
            return true;
        } else {
            return false;
        }
    };

    getName(){
        return this.fileName;
    };

    getIsSaved(){
        return this.isSaved;
    };

    open(name){
        this.content = fs.writeFileSync(`${this.address}/${name}`, 'UTF-8');
        this.fileName = name;
        this.isSaved = true;
        return this.content;
    };
}

module.exports = Document;