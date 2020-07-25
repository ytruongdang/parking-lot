const expect = require('chai').expect
const cmd = require('./Cmd');
const { EOL } = require('os');
const Path = require('path')
describe('Parking lot CLI', () => {
    const path = Path.resolve(__dirname, '../', 'bin/parking_lot')
    it('should print corrent out create parking lot', async () => {
        const response = await cmd.execute(path, [], ['create_parking_lot 10', cmd.ENTER])
        expect(
            response
                .trim()
                .split(EOL)
                .pop()
        ).to.match(/^Created parking lot with 10 slots/)
    })

    it('should print correct output', async () => {
        const response = await cmd.execute(path, ['file_inputs.txt'])
        console.log(response)
        expect(
            response
              .trim()
              .split(EOL)
              .pop() // Get the last line
          ).to.match(/^6 	 	 KA-01-HH-3141/)
    })
})