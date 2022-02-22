const callToApi = () => {
    return fetch('./data/adalabers.json')
        .then(response => response.json())
        .then(response => {
            const resultElements = response.results;
            return resultElements;
        });
};

export default callToApi;