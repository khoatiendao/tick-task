const {v4: uuidv4, v1: uuidv1} = require('uuid')

function generateUUIDWithCharacter(character) {
    return `${character}-${uuidv4()}`
}

function generateUUIDTimeWithCharacter(character) {
    return `${character.split(' ').map(word => word[0]).join('')}-${uuidv1()}`
}

module.exports = {generateUUIDWithCharacter, generateUUIDTimeWithCharacter}