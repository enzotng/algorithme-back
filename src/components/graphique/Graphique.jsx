import React from 'react';
import './Graphique.scss';
import ComparaisonTri from './comparaisonTri/ComparaisonTri';
import ComparaisonRecherche from './comparaisonRecherche/ComparaisonRecherche';

const Graphique = () => {
  return (
    <main>
      <section>
        <ComparaisonTri />
        <ComparaisonRecherche />
      </section>
    </main>
  );
};

export default Graphique;
