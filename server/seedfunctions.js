

const getRandomItem = (array = []) => {
    const index = Math.floor(Math.random() * array.length);
    return array[index]
}

const getRandomNumberBasedOnMax = (max = 0) => {
    return Math.floor(Math.random() * max)
}

module.exports = {
    getRandomItem,
    getRandomNumberBasedOnMax,
}