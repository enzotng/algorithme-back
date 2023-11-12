function rechercheDichotomique(tableau, valeurRecherchee) {
  let debut = 0;
  let fin = tableau.length - 1;

  while (debut <= fin) {
      const milieu = Math.floor((debut + fin) / 2);

      if (tableau[milieu] === valeurRecherchee) {
          return milieu;
      } else if (tableau[milieu] < valeurRecherchee) {
          debut = milieu + 1;
      } else {
          fin = milieu - 1;
      }
  }

  return -1;
}

export { rechercheDichotomique };
