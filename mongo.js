const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://mcodex:${password}@cluster0.ryhasey.mongodb.net/phoneApp?appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// Si hay 3 argumentos (node mongo.js password), LISTAMOS las entradas
if (process.argv.length === 3) {
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

// Si hay 5 argumentos (node mongo.js password nombre numero), AGREGAMOS una entrada
else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

// Si los argumentos no son correctos
else {
  console.log(
    "Invalid arguments. Use: node mongo.js <password> <name> <number>"
  );
  mongoose.connection.close();
}
