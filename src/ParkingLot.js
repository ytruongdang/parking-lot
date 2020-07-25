const Car = require('./Car')

const priceOfFirsTwotHours = 10
const priceAfterFirstTwoHours = 10

class ParkingLot {

    constructor() {
        this.availableSlot = []
        this.carSlot = new Map()
    }

    createParkLot(lot = 0) {
        if(!this.checkIsValidNumber(lot)) {
            console.log('Invalid lot param')
            return
        }
        this.availableSlot = []
        for(let i = 1; i <= lot; i++) {
            this.availableSlot.push({slot: i, car: null})
        }
        console.log(`Created parking lot with ${lot} slots`)
    }

    park(carNumber = '', color = '') {
        if(!this.isFullSlot()) {
            const nearestIndex = this.findNearestSlot()
            const nearest = this.availableSlot[nearestIndex]
            const newCar = new Car(carNumber, color, nearest.slot)
            this.availableSlot[nearestIndex].car = newCar
            this.carSlot.set(carNumber, newCar)
            console.log(`Allocated slot number: ${nearest.slot}`)
        } else {
            console.log("Sorry, parking lot is full")
        }
    }

    leave(carNumber = '', hours = 0) {
        const car = this.carSlot.get(carNumber)
        if(!car) {
            console.log(`Registration number ${carNumber} not found`)
            return
        }
        const slotIndex = this.availableSlot.findIndex((avalibleSlot) => avalibleSlot.slot === car.slot)
        if(this.availableSlot[slotIndex]) {
            this.availableSlot[slotIndex].car = null
            this.carSlot.delete(carNumber)
            console.log(`Registration number ${carNumber} with Slot Number ${car.slot} is free with Charge ${this.caculateFee(hours)}`)
        } else {
            console.log('Some error')
        }
    }

    status() {
        console.log(`Slot No.\t Registration No.`)
        this.availableSlot.map((slot) => {
            console.log(`${slot.slot} \t \t ${slot.car ? slot.car.number : 'empty'}`)
        })
    }

    caculateFee(hours) {
        if(hours <= 2) {
            return priceOfFirsTwotHours
        }
        const fee = Math.ceil(hours - 2) * priceAfterFirstTwoHours
        return priceOfFirsTwotHours + fee
    }

    isFullSlot() {
        return this.availableSlot.length <= this.carSlot.size
    }

    findNearestSlot() {
        const nearest = this.availableSlot.findIndex((slot) => slot.car === null)
        return nearest <= 0 ? 0 : nearest
    }

    checkIsValidNumber(value) {
        const isNumber = /^\d+$/.test(value)
        if(isNumber) {
            return true
        }
        return false
    }

}

module.exports = ParkingLot