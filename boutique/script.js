//const fs = require("fs");
//
//fs.writeFileSync("texte.txt", "je fait des teste numero 2");
//console.log("le fichier test a ete cree");
//
//const fileContent = fs.readFileSync("texte.txt", "utf8");
//console.log(fileContent);

//const { require } = require("yargs");


//const f = require("./test")
//const { } = require("mathjs")
//console.log(f.multiply(5,10))
//console.log(f.divise(5,10))


//const chalk = require("chalk");
//
//console.log(chalk.red("fsefse"))
//console.log(chalk.green.bold("Valider!"))
//console.log(chalk.yellow.underline("Attention!"))


//const {argv} = require("process");  

//const test = argv[0];
//
//if (test === "foo") {
//    console.log("cest bon pour foo")
//} else if (test === "bar"){
//    console.log("cest bon pour bar")
//}else {
//    console.log("domage")
//}


//const argv = require("minimist")(process.argv.slice(2));
//
//console.log(argv.name);
//console.log(argv.a);


const {readFileSync, writeFileSync } = require("fs");

const {name, age, legal } = JSON.parse(readFileSync('./mydata.json', 'utf-8'));
//
//console.log(name)
//console.log(age)
//console.log(legal)
//
//const myData = {
//    names: "Justine",
//    age: 27,
//    legal: false
//}
//
//const objectToJson = JSON.stringify(myData);
//console.log(objectToJson);
//
//writeFileSync("./myData.json", objectToJson)


const myData = JSON.parse(readFileSync('./mydata.json', 'utf-8'));
console.log(myData.name)

myData.name = "Pierre";


const objectToJson = JSON.stringify(myData);
writeFileSync('./mydata.json', objectToJson);

