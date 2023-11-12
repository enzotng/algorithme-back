export const triInsertion = (tableau) => {
    const n = tableau.length;
    for (let i = 1; i < n; i++) {
        let currentElement = tableau[i];
        let j = i - 1;
        while (j >= 0 && tableau[j] > currentElement) {
            tableau[j + 1] = tableau[j];
            j = j - 1;
        }
        tableau[j + 1] = currentElement;
    }
}

const TriInsertion = () => {
};

export default TriInsertion;

