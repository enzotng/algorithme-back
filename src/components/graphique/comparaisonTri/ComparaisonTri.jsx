import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import { triFusion } from '../triFusion/TriFusion';
import { triBulles } from '../triBulles/TriBulles';
import { triInsertion } from '../triInsertion/TriInsertion';

Chart.defaults.font.size = 12;

function ComparaisonTri() {
    const [tailleDonneesTriFusion, setTailleDonneesTriFusion] = useState('');
    const [tailleDonneesTriBulles, setTailleDonneesTriBulles] = useState('');
    const [tailleDonneesTriInsertion, setTailleDonneesTriInsertion] = useState('');
    const [tempsExecutionTriFusion, setTempsExecutionTriFusion] = useState('');
    const [tempsExecutionTriBulles, setTempsExecutionTriBulles] = useState('');
    const [tempsExecutionTriInsertion, setTempsExecutionTriInsertion] = useState('');
    const [donneesGraphique, setDonneesGraphique] = useState([]);
    const [chartId] = useState(`chart-${Math.random()}`);
    const [tempsTriFusion, setTempsTriFusion] = useState([]);
    const [tempsTriBulles, setTempsTriBulles] = useState([]);
    const [tempsTriInsertion, setTempsTriInsertion] = useState([]);
    const algorithmeTitre = "Comparaison entre le Tri à Fusion, le Tri à Bulles et le Tri à Insertion";

    useEffect(() => {
        genererGraphique();
    }, [tempsTriFusion, tempsTriBulles, tempsTriInsertion]);

    const genererGraphique = () => {
        if (tempsTriFusion.length === 0 || tempsTriBulles.length === 0 || tempsTriInsertion.length === 0) {
            return;
        }

        setDonneesGraphique((donneesGraphique) => [
            ...donneesGraphique,
            {
                algorithme: algorithmeTitre,
                taille: parseInt(
                    tailleDonneesTriFusion !== '' ? tailleDonneesTriFusion : (tailleDonneesTriBulles !== '' ? tailleDonneesTriBulles : ''),
                ),
                tempsTriFusion: parseFloat(tempsExecutionTriFusion),
                tempsTriBulles: parseFloat(tempsExecutionTriBulles),
                tempsTriInsertion: parseFloat(tempsExecutionTriInsertion),
            },
        ]);
    };

    const executerTriFusion = () => {
        const taille = parseInt(tailleDonneesTriFusion);
        const tableau = [...Array(taille)].map(() => Math.random());

        const debut = performance.now();
        triFusion(tableau);
        const fin = performance.now();

        const temps = fin - debut;

        setTempsExecutionTriFusion(temps.toFixed(2));
        setTempsTriFusion((tempsTriFusion) => [...tempsTriFusion, temps]);
    };

    const executerTriBulles = () => {
        const taille = parseInt(tailleDonneesTriBulles);
        const tableau = [...Array(taille)].map(() => Math.random());

        const debut = performance.now();
        triBulles(tableau);
        const fin = performance.now();

        const temps = fin - debut;

        setTempsExecutionTriBulles(temps.toFixed(2));
        setTempsTriBulles((tempsTriBulles) => [...tempsTriBulles, temps]);
    };

    const executerTriInsertion = () => {
        const taille = parseInt(tailleDonneesTriBulles);
        const tableau = [...Array(taille)].map(() => Math.random());

        const debut = performance.now();
        triInsertion(tableau);
        const fin = performance.now();

        const temps = fin - debut;

        setTempsExecutionTriInsertion(temps.toFixed(2));
        setTempsTriInsertion((tempsTriInsertion) => [...tempsTriInsertion, temps]);
    };

    const data = {
        labels: donneesGraphique.map((donnee) => donnee.taille.toString()),
        datasets: [
            {
                label: 'Tri Fusion (ms)',
                backgroundColor: 'rgba(121, 120, 233, 1)',
                borderColor: 'rgba(121, 120, 233, 1)',
                borderWidth: 1,
                data: tempsTriFusion,
            },
            {
                label: 'Tri à Bulles (ms)',
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: tempsTriBulles,
            },
            {
                label: 'Tri à Insertion (ms)',
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: tempsTriInsertion,
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
            <div className="tri-container">
                <div className="algorithme-container">
                    <h2>Tri Fusion</h2>
                    <div className="input-container">
                        <input
                            type="number"
                            placeholder="Taille des données"
                            value={tailleDonneesTriFusion}
                            onChange={(e) =>
                                setTailleDonneesTriFusion(e.target.value)
                            }
                        />
                        <button onClick={executerTriFusion}>Exécuter</button>
                    </div>
                    {tempsExecutionTriFusion !== '' && (
                        <p>Temps d'exécution : {tempsExecutionTriFusion} ms</p>
                    )}
                    <h2>Tri à Bulles</h2>
                    <div className="input-container">
                        <input
                            type="number"
                            placeholder="Taille des données"
                            value={tailleDonneesTriBulles}
                            onChange={(e) =>
                                setTailleDonneesTriBulles(e.target.value)
                            }
                        />
                        <button onClick={executerTriBulles}>Exécuter</button>
                    </div>
                    {tempsExecutionTriBulles !== '' && (
                        <p>Temps d'exécution : {tempsExecutionTriBulles} ms</p>
                    )}
                    <h2>Tri à Insertion</h2>
                    <div className="input-container">
                        <input
                            type="number"
                            placeholder="Taille des données"
                            value={tailleDonneesTriInsertion}
                            onChange={(e) =>
                                setTailleDonneesTriInsertion(e.target.value)
                            }
                        />
                        <button onClick={executerTriInsertion}>Exécuter</button>
                    </div>
                    {tempsExecutionTriInsertion !== '' && (
                        <p>Temps d'exécution : {tempsExecutionTriInsertion} ms</p>
                    )}
                    {donneesGraphique.length > 0 && (
                        <div className="graphique">
                            <Line data={data} options={options} id={chartId} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ComparaisonTri;
