const paginate = (results, pageNumber, pageSize) => {
    const start = (pageNumber - 1) * pageSize;
    const end = pageNumber * pageSize;
    const pageResults = results.slice(start, end);
    return {
        numberOfResults: results.length,
        results: pageResults,
        pageNumber,
        pageSize,
        totalPages: Math.ceil(results.length / pageSize),
    }
}

module.exports = paginate;