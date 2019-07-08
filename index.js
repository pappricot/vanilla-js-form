function uuid() {
  return crypto.getRandomValues(new Uint32Array(4)).join("-");
} // more unique than Math.random()

class Vehicle {
  constructor(name = "new vehicle") {
    this._name = name;
    this._id = uuid();
  }

  getName() {
    return this._name;
  }
  setName(name) {
    this._name = name;
  }
  get wheels() {
    return this._wheels;
  }
  set wheels(wheels) {
    this._wheels = wheels;
  }
  get seats() {
    return this._seats;
  }
  set seats(seats) {
    this._seats = seats;
  }
}

class Car extends Vehicle {
  constructor(name = "new car") {
    super(name);
    this._wheels = 4;
    this._seats = 5;
  }
}

class Motorcycle extends Vehicle {
  constructor(name = "new motorcycle") {
    super(name);
    this._wheels = 2;
    this._seats = 1;
  }
}

function runUnitTests() {
  let vehicle = new Vehicle();
  let car = new Car();
  let motorcycle = new Motorcycle();
  if (!(vehicle instanceof Vehicle)) {
    throw new Error("expected vehicle to be an instance of Vehicle");
  }
  if (!(car instanceof Car)) {
    throw new Error("expected car to be an instance of Car");
  }
  if (!(motorcycle instanceof Motorcycle)) {
    throw new Error("expected motorcycle to be an instance of Motorcycle");
  }
}
runUnitTests();

const state = {
  vehicles: []
};

window.state = state;

window.addEventListener("load", function() {
  const buttonEl = document.querySelector("#formAddVehicle");
  buttonEl.addEventListener("submit", function() {
    event.preventDefault();
    const selectedTypeEl = document.querySelector("#selectVehicleType");
    const selectedType = selectedTypeEl.value;

    const selectedNameEl = document.querySelector("#inputVehicleName");
    const selectedName = selectedNameEl.value;

    let vehicle;
    switch (selectedType.toLowerCase()) {
      case "car": {
        vehicle = new Car(selectedName);
        break;
      }
      case "motorcycle": {
        vehicle = new Motorcycle(selectedName);
        break;
      }
      default: {
        throw new Error(`The type ${selectedType} is not supported`);
      }
    }
    state.vehicles.push(vehicle);
    renderVehicleList();
  });

  //event delegation
  const vehicleListEl = document.querySelector("#vehicleList");
  vehicleListEl.addEventListener("click", function(clickEvent) {
    const target = clickEvent.target;
    if (target.className !== "info-button") {
      return; // exit event listener
    }
    const id = target.getAttribute("data-id");
    const vehicle = state.vehicles.find(v => v._id === id); //find the first match
    if (!vehicle) {
      return;
    }
    const msg = `I am ${vehicle.getName()}, a ${
      vehicle.constructor.name
    } with ${vehicle.wheels} wheels, and ${vehicle.seats} seats!`;
    alert(msg);
    //vehicle.constructor.name gets the class name
  });
});

function renderVehicleList() {
  let html = "";
  for (const vehicle of state.vehicles) {
    const liHTML = `<li><p>${vehicle.getName()}<p> <button class="info-button" data-id="${
      vehicle._id
    }">info</button></li>`;
    html += liHTML;
  }
  document.querySelector("#vehicleList").innerHTML = html;
}
