class Animal {
   constructor(name, type) {
       this.name = name;
       this.type = type;
   }
   describe() {
       return `${this.name} egy ${this.type}.`;
   }
}
class Dog extends Animal {
   constructor(name, breed) {
       super(name, 'kutya');
       this.breed = breed;
   }
   describe() {
       return `${super.describe()} Fajta: ${this.breed}.`;
   }
}
document.getElementById('createAnimal').addEventListener('click', function() {
   const dog = new Dog('Bodri', 'Puli');
   const div = document.createElement('div');
   div.innerText = dog.describe();
   document.getElementById('animalList').appendChild(div);
});