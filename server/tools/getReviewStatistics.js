const { consoleLogger } = require("../errorhandling/logger")

const getReviewStatistics = async (reviews) => {
    let fives = 0
    let fours = 0
    let threes = 0
    let twos = 0
    let ones = 0
    for(review of reviews) {
        consoleLogger.info(review.rating)
        switch(review.rating) {
            case 5:
                fives++
                break
            case 4:
                fours++
                break
            case 3:
                threes++
                break
            case 2:
                twos++
                break
            case 1:
                ones++
                break
            default:
                consoleLogger.error("Invalid rating")
        }
    }

    const stuff = {
        numberOfReviews: reviews.length,
        fiveStars: fives,
        fourStars: fours,
        threeStars: threes,
        twoStars: twos,
        oneStar: ones,
        averageRating: (fives * 5 + fours * 4 + threes * 3 + twos * 2 + ones) / reviews.length
    }

    consoleLogger.info(stuff)
    return {
        numberOfReviews: reviews.length,
        fiveStars: fives,
        fourStars: fours,
        threeStars: threes,
        twoStars: twos,
        oneStar: ones,
        averageRating: (fives * 5 + fours * 4 + threes * 3 + twos * 2 + ones) / reviews.length
    }
}

module.exports = getReviewStatistics