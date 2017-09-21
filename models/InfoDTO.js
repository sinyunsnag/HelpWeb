function InfoDTO(id, receiver, caller, location, time, file, car_number) {
    this.id = id;
    this.receiver = receiver;
    this.caller = caller;
    this.location = location;
    this.time = time;
    this.file = file;
    this.car_number = car_number;
}

module.exports = InfoDTO;