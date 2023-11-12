export const triFusion = (tableau) => {
    if (tableau.length <= 1) {
        return tableau;
    }

    const milieu = Math.floor(tableau.length / 2);
    const tableauGauche = tableau.slice(0, milieu);
    const tableauDroite = tableau.slice(milieu);

    const fusionner = (gauche, droite) => {
        let resultat = [];
        let indexGauche = 0;
        let indexDroite = 0;

        while (indexGauche < gauche.length && indexDroite < droite.length) {
            if (gauche[indexGauche] < droite[indexDroite]) {
                resultat.push(gauche[indexGauche]);
                indexGauche++;
            } else {
                resultat.push(droite[indexDroite]);
                indexDroite++;
            }
        }

        return resultat.concat(gauche.slice(indexGauche), droite.slice(indexDroite));
    };

    return fusionner(triFusion(tableauGauche), triFusion(tableauDroite));
};

const TriFusion = () => {
};

export default TriFusion;