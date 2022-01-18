const callToApi = () => {
    return fetch('https://beta.adalab.es/pw-recursos/apis/adalabers-v1/promo-patata.json')
        .then(response => response.json())
        .then(response => {
            const resultElements = response.results;
            return resultElements;
        });
};

export default callToApi;