const commands = [{command: 'create_parking_lot', args: 0}, ]
const ParkingLot = require('./ParkingLot')

const parkingLot = new ParkingLot()

module.exports = (command = '', params = '', time = 0) => {

    switch(command) {
        case 'create_parking_lot':
            parkingLot.createParkLot(params)
            break
        case 'park':
            parkingLot.park(params)
            break
        case 'leave':
            parkingLot.leave(params, time)
            break
        case 'status':
            parkingLot.status()
            break
        default:
            console.log('Invalid command')
            break
    }

}
