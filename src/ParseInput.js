const fs = require('fs')
const Path = require('path')

class ParseInput {
    constructor() {
        this.params = []
    }

    parse(command = '') {
        this.params = command.split(' ')
    }

    getCommand() {
        return this.params[0] ? this.params[0] : ''
    }

    getArguments(index = 0) {
        const args = this.params.slice(1)
        return args[index] ? args[index] : ''
    }

    isFile() {
        this.params = process.argv.slice(2)
        const isFile = /[^\\/]+\.[txt]+$/.test(this.params[0])
        return isFile
    }

    getFileContent() {
        const file = Path.resolve(__dirname, '../', this.params[0])
        try {
            if (fs.existsSync(file)) {
              const content = fs.readFileSync(file, 'utf8').split(/\r?\n/)
              return content
            }
            return null
        } catch(err) {
            return null
        }
    }
}

module.exports = new ParseInput()