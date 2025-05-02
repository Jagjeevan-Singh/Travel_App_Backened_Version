const { v4: uuid } = require('uuid');

const categories = {
    "data": [
    { id: uuid(), category: "Peace" },
    { id: uuid(), category: "Relaxation" },
    { id: uuid(), category: "Adventure" },
    { id: uuid(), category: "Business" },
    { id: uuid(), category: "Nature" },
    { id: uuid(), category: "Luxury" },
    { id: uuid(), category: "Wildlife" },
    { id: uuid(), category: "Heritage" },

    ]
}

module.exports = categories;