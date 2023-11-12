// ComparaisonRecherche.jsx
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

import { rechercheDichotomique } from '../rechercheDichotomique/RechercheDichotomique';
import { rechercheNaive } from '../rechercheNaive/RechercheNaive';

Chart.defaults.font.size = 12;

function ComparaisonRecherche() {
    const [tailleDonnees, setTailleDonnees] = useState('');
    const [tempsExecutionDichotomique, setTempsExecutionDichotomique] = useState('');
    const [tempsExecutionNaive, setTempsExecutionNaive] = useState('');
    const [resultatDichotomique, setResultatDichotomique] = useState('');
    const [resultatNaive, setResultatNaive] = useState('');
    const [donneesGraphique, setDonneesGraphique] = useState([]);
    const [chartId] = useState(`chart-${Math.random()}`);
    const [tempsRechercheDichotomique, setTempsRechercheDichotomique] = useState([]);
    const [tempsRechercheNaive, setTempsRechercheNaive] = useState([]);
    const algorithmeTitre = "Comparaison entre la Recherche Dichotomique et la Recherche Naive";
    

    useEffect(() => {
        genererGraphique();
    }, [tempsRechercheDichotomique, tempsRechercheNaive]);

    const genererGraphique = () => {
        if (tempsRechercheDichotomique.length === 0 || tempsRechercheNaive.length === 0) {
            return;
        }

        setDonneesGraphique((donneesGraphique) => [
            ...donneesGraphique,
            {
                algorithme: algorithmeTitre,
                taille: parseInt(tailleDonnees),
                tempsRechercheDichotomique: parseFloat(tempsExecutionDichotomique),
                tempsRechercheNaive: parseFloat(tempsExecutionNaive),
            },
        ]);
    };

    const executerRechercheDichotomique = () => {
        const taille = parseInt(tailleDonnees);
        const tableau = [...Array(taille)].map(() => Math.random()).sort((a, b) => a - b);
        const valeurRecherchee = Math.random();

        const debut = performance.now();
        const resultat = rechercheDichotomique(tableau, valeurRecherchee);
        const fin = performance.now();

        const temps = fin - debut;

        setTempsExecutionDichotomique(temps.toFixed(2));
        setTempsRechercheDichotomique((tempsRechercheDichotomique) => [...tempsRechercheDichotomique, temps]);

        if (resultat !== -1) {
            setResultatDichotomique(`La valeur ${valeurRecherchee} a été trouvée à l'indice ${resultat}.`);
        } else {
            setResultatDichotomique(`La valeur ${valeurRecherchee} n'a pas été trouvée.`);
        }
    };

    const executerRechercheNaive = () => {
        const taille = parseInt(tailleDonnees);
        const tableau = [...Array(taille)].map(() => Math.random());
        const valeurRecherchee = Math.random();

        const debut = performance.now();
        const resultat = rechercheNaive(tableau, valeurRecherchee);
        const fin = performance.now();

        const temps = fin - debut;

        setTempsExecutionNaive(temps.toFixed(2));
        setTempsRechercheNaive((tempsRechercheNaive) => [...tempsRechercheNaive, temps]);

        if (resultat !== -1) {
            setResultatNaive(`La valeur ${valeurRecherchee} a été trouvée à l'indice ${resultat}.`);
        } else {
            setResultatNaive(`La valeur ${valeurRecherchee} n'a pas été trouvée.`);
        }
    };

    const data = {
        labels: donneesGraphique.map((donnee) => donnee.taille.toString()),
        datasets: [
            {
                label: 'Recherche Dichotomique (ms)',
                backgroundColor: 'rgba(121, 120, 233, 1)',
                borderColor: 'rgba(121, 120, 233, 1)',
                borderWidth: 1,
                data: tempsRechercheDichotomique,
            },
            {
                label: 'Recherche Naive (ms)',
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: tempsRechercheNaive,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
            },
        },
    };

    return (
        <div className="comparaison-container">
            <h1>{algorithmeTitre}</h1>
            <div className="recherche-container">
                <div className="algorithme-container">
                    <h2>Recherche Dichotomique</h2>
                    <div className="input-container">
                        <input
                            type="number"
                            placeholder="Entrez une valeur..."
                            value={tailleDonnees}
                            onChange={(e) =>
                                setTailleDonnees(e.target.value)
                            }
                        />
                        <button onClick={executerRechercheDichotomique}>Exécuter</button>
                    </div>
                    {tempsExecutionDichotomique !== '' && (
                        <p>Temps d'exécution : {tempsExecutionDichotomique} ms</p>
                    )}
                    {resultatDichotomique && (
                        <p>Résultat : {resultatDichotomique}</p>
                    )}
                    <h2>Recherche Naive</h2>
                    <div className="input-container">
                        <input
                            type="number"
                            placeholder="Entrez une valeur..."
                            value={tailleDonnees}
                            onChange={(e) =>
                                setTailleDonnees(e.target.value)
                            }
                        />
                        <button onClick={executerRechercheNaive}>Exécuter</button>
                    </div>
                    {tempsExecutionNaive !== '' && (
                        <p>Temps d'exécution : {tempsExecutionNaive} ms</p>
                    )}
                    {resultatNaive && (
                        <p>Résultat : {resultatNaive}</p>
                    )}
                    {donneesGraphique.length > 0 && (
                        <div className="graphique">
                            <Bar data={data} options={options} id={chartId} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ComparaisonRecherche;
