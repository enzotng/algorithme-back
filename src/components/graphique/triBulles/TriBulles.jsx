export const triBulles = (tableau) => {
    const n = tableau.length;
    let permutations;

    do {
        permutations = false;
        for (let i = 0; i < n - 1; i++) {
            if (tableau[i] > tableau[i + 1]) {
                const temp = tableau[i];
                tableau[i] = tableau[i + 1];
                tableau[i + 1] = temp;
                permutations = true;
            }
        }
    } while (permutations);

    return tableau;
};

const TriBulles = () => {
};

export default TriBulles;
