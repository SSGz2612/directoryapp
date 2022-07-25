const readline = require('readline');
const message = require('./messages');
const Document = require('./document');
const Directory = require('./directory');

const dir = new Directory();
const rl = readline.createInterface(process.stdin, process.stdout);

MainApp();
function MainApp(){
    process.stdout.write('\033c');

    rl.question(message.mainWindow, (i) => {
        switch(i.trim()){
            case '1':
                createFile();
            break;
            
            case '2':
                openDoc();
            break;
            
            case '3':
                process.stdout.write('\033c');
                rl.close();
            break;
            
            default: MainApp();
        }
    });
}

function createFile(){
    let fl = new Document(dir.getPath());

    repInterface(fl);
    readCommands(fl);
};

function openDoc(){
    let file = new Document(dir.getPath());
    dir.createdir();

    rl.question(message.requestFileName, (name) => {
        if(file.fileExists(name)){
            openFl(file, name);
        } else {
            console.log(message.fileNoFound);
            rl.removeAllListeners('line');
            MainApp();
        }
    })
};

function openFl(file, name){
    file.open(name);

    repInterface(file);
    readCommands(file);
}

function repInterface(fl, m){
    process.stdout.write('\033c');
    (fl.getName() == '') ? console.log('| Untitle |') : console.log(`| ${fl.getName()} |`);

    console.log(message.comands);

    if(m != null) console.log(m);
    console.log(fl.getContent());
};

function readCommands(fl){
    rl.on('line', (i) => {
        switch(i.trim()){
            case 'A':
                svasfl(fl);
            break;

            case 'S':
                sv(fl);
            break;

            case 'Q':
                rl.removeAllListeners('line');
                MainApp();
            break;

            default:
                // fl.append(i.trim());
        }
    })
};

function svasfl(fl){
    rl.question(message.requestFileName, (name) => {
        if(fl.fileExists(name)){
            console.log(message.fileFound);
            rl.question(message.replaceFile, (confirm) => {
                if(confirm = 'y'){
                    fl.saveAsFile(name);
                    repInterface(fl, message.fileSaved + '\n');
                } else {
                    repInterface(fl, message.fileNoFound + '\n');
                }
            })
        } else {
            fl.saveAsFile(name);
            repInterface(fl, message.fileSaved + '\n');
        }
    })
};

function sv(fl){
    if(fl.hasName()){
        fl.saveFile();
        repInterface(fl, message.fileSaved + '\n');
    } else {
        svasfl(fl);
    }
};