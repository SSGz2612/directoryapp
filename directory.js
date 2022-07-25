const fs = require('fs');
const path = require('path');

class Directory {
    constructor(){
        this.folder = 'data';
        this.address = __dirname;
        this.createdir();
    };

    createdir(){
        // this.address = path.join(this.address, this.folder);
        this.address = this.address;

        if(!fs.existsSync(this.folder)){
            console.log('Created a new folder!');
            fs.mkdirSync(this.folder);
        } else {
            console.log(`* folder directory * --> ${this.address}`);
        }
    };

    getPath(){
        return this.address;
    };

    getShortPath(){
        const paths = path.parse(this.address);
        return `${paths.root}...${paths.name}`;
    };

    showfiles(){
        let files = fs.readdirSync(this.address);
        console.log(
            '=== ' + this.getShortPath() + ' ===\n',
            files.forEach((f) => { f })
        );
    };
}

module.exports = Directory;