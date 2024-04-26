function errorHandler (err, req, res, next) {

    if (err.name === 'SequelizeValidationError') {
        res.status(400).json({message: err.errors.map((err) => err.message)})
    } 
    //Public Error Handlers

    //User ---> login and register
    else if (err.name === 'SequelizeUniqueConstraintError') { // USER <<<<
        res.status(400).json({message: err.errors.map((err) => err.message)})
    } else if (err.name === 'InvalidLoginInput') {
        res.status(400).json({message: `Email or Password is required`})
    } else if (err.name === 'InvalidUserInput') {
        res.status(401).json({message: `Invalid Email or Password`})
    } else if (err.name === 'CollectionNotFound') {
        res.status(401).json({message: `Collection not found`})
    } else if (err.name === 'ArtworkNotFound') {
        res.status(401).json({message: `Artwork not found`})
    } else if (err.name === 'Forbidden') {
        res.status(401).json({message: `You are not authorized to perform this action`})
    } else {
        res.status(500).json({message: `Internal Server Error`})
        console.log(err)
    }
}

module.exports = errorHandler;

// SequelizeUniqueConstraintError