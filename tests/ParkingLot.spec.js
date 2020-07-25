const ParkingLot = require('../src/ParkingLot')
const assert = require('assert')


describe('ParkingLot test', function () {
    const parkingLot = new ParkingLot()
    it('should create a parking lot of size n', (done) => {
        parkingLot.createParkLot(6)
        assert(parkingLot.availableSlot.length === 6)
        done()
    })

    it('should add car to parking lot', (done) => {
        parkingLot.park('KA-01-HH-1234')
        done()
    })

    it('should check parking is full', (done) => {
        parkingLot.createParkLot(6)
        parkingLot.park('KA-01-HH-1234')
        parkingLot.park('KA-01-HH-9999')
        parkingLot.park('KA-01-BB-0001')
        parkingLot.park('KA-01-HH-7777')
        parkingLot.park('KA-01-HH-2701')
        parkingLot.park('KA-01-HH-3141')
        parkingLot.park('KA-01-HH-0987')
        assert(parkingLot.isFullSlot())
        done()
    })

    it('can unpark a car', (done) => {
        parkingLot.leave('KA-01-HH-1234', 4)
        parkingLot.availableSlot.map((slot) => {
            if(slot.slot === 1) {
                assert(slot.car === null)
            }
        })
        done()
    })

    it('test caculate fee', (done) => {
        const fee = parkingLot.caculateFee(5)
        assert(fee === 40)
        const fee2 = parkingLot.caculateFee(4.5)
        assert(fee2 === 40)
        done()
    })

})