const addCharacter = (req, res) => {
    //resources
    const {
        name,
        age,
        isForceSensitive
    } = req.body;
    
    const db = req.app.get('db');
    
    //logic

    db.add_character(name, age, isForceSensitive)
    .then(() => {
        res.sendStatus(200);
    })
    .catch((e) => {
        res.status(500).json(e);
    })

}

const getCharacter = (req, res) => {
    const { id } = req.params;

    const db = req.app.get('db');

    db.get_character(id)
    .then((character) => {
        res.status(200).json(character);
    })
    .catch((e) => {
        res.status(500).json(e);
    })
}


module.exports = {
    addCharacter,
    getCharacter
}