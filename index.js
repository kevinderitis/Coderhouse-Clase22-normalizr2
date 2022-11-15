const { normalize, denormalize, schema } = require('normalizr');
const fs = require('fs')

// Get original data
const holding = fs.readFileSync('./holding.json')
const holdingObj = JSON.parse(holding)

// Schemas
const empleado = new schema.Entity('empleado')

const organigrama = new schema.Entity('organigrama', {
    gerente: empleado,
    encargado: empleado,
    empleados: [ empleado ]
})

const grupo = new schema.Entity('grupo', {
    empresas: [ organigrama ]
})

const util = require('util')

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true))
}
console.log('Objeto original')
print(holdingObj)

// Normalizar objeto
console.log('--------Normalizar objeto----------')
const normalizedData = normalize(holdingObj, grupo)
print(normalizedData)


// Desnormalizar objeto
console.log('--------Desnormalizar objeto----------')
const denormalizedData = denormalize(normalizedData.result, grupo, normalizedData.entities)
print(denormalizedData)


console.log(`Longitud objeto original: ${JSON.stringify(holdingObj).length}`)
console.log(`Longitud objeto normalizado: ${JSON.stringify(normalizedData).length}`)
console.log(`Longitud objeto desnormalizado: ${JSON.stringify(denormalizedData).length}`)