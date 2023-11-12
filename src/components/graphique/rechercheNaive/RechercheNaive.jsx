function rechercheNaive(tableau, valeurRecherchee) {
  for (let i = 0; i < tableau.length; i++) {
      if (tableau[i] === valeurRecherchee) {
          return i;
      }
  }

  return -1;
}

export { rechercheNaive };
