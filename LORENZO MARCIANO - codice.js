const nomefile='LORENZO MARCIANO - lista-codici.txt';
let cognome, nome, gNasc, mNasc, aNasc, genere, lNasc, codCat, CodFisc;

const mesiNomi = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];

const selectMese = document.getElementById("MNasc");
  for(let mese = 0; mese < 12; mese++){
    let option = document.createElement("option");
    option.value = mese + 1;
    option.textContent = mesiNomi[mese];
    selectMese.appendChild(option);
  }

const selectAnno = document.getElementById("ANasc");
  for(let anno = 1900; anno <= 2024; anno++){
    let option = document.createElement("option");
    option.value = anno;
    option.textContent = anno;
    selectAnno.appendChild(option);
  }

function popolaGiorni(){
  const selectGiorno = document.getElementById("GNasc");
  mNasc = document.getElementById("MNasc").value;
  aNasc = document.getElementById("ANasc").value;
  let giornoSelez = parseInt(document.getElementById("GNasc").value) || 1;

  selectGiorno.innerHTML = "";

  let maxGiorni;
  if(mNasc == 2){
    if((aNasc % 4 == 0 && aNasc % 100 != 0) || (aNasc % 400 == 0)){
      maxGiorni = 29;
    } else {
      maxGiorni = 28;
    }
  } else if(mNasc === "4" || mNasc === "6" || mNasc === "9" || mNasc === "11"){
    maxGiorni = 30;
  } else {
    maxGiorni = 31;
  }

  for(let giorno = 1; giorno <= maxGiorni; giorno++){
    let option = document.createElement("option");
    option.value = giorno;
    option.textContent = giorno;
    selectGiorno.appendChild(option);
  }

  if(giornoSelez <= maxGiorni){
    selectGiorno.value = giornoSelez;
  } else {
    selectGiorno.value = maxGiorni;
  }
}

function CalcolaCodFisc(){
  cognome = document.getElementById("Cognome").value.toUpperCase();
  nome = document.getElementById("Nome").value.toUpperCase();
  gNasc = document.getElementById("GNasc").value;
  mNasc = document.getElementById("MNasc").value;
  aNasc = document.getElementById("ANasc").value;
  genere = document.getElementById("Genere").value;
  lNasc = document.getElementById("LuogoN").value.toUpperCase();

  CalcolaCognome();
  CalcolaNome();
  CalcolaDataNasc();
  CalcolaCodCatast();
}

function CalcolaCognome(){
  let var1 = cognome.replace(/[^AEIOU]/g, "");
  let var2 = cognome.replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/g, "");

  if(var2.length >= 3){
    CodFisc = var2.substring(0,3);
  } else if(var2.length < 3 && var2.length+var1.length >= 3){
    CodFisc = var2 + var1.substring(0,3-var2.length);
  } else {
    CodFisc = var2 + var1 + "X";
  }
}

function CalcolaNome(){
  let var1 = nome.replace(/[^AEIOU]/g, "");
  let var2 = nome.replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/g, "");

  if(var2.length > 3){
    CodFisc += var2[0] + var2.substring(2,4);
  } else if(var2.length == 3){
    CodFisc += var2;
  } else if(var2.length < 3 && var2.length+var1.length >= 3){
    CodFisc += var2 + var1.substring(0,3-var2.length);
  } else {
    CodFisc += var2 + var1 + "X";
  }
}

function CalcolaDataNasc(){
  CodFisc += aNasc.substring(2);

  const codiciMesi = {
    "1": "A", "2": "B", "3": "C", "4": "D", "5": "E", "6": "H",
    "7": "L", "8": "M", "9": "P", "10": "R", "11": "S", "12": "T"
  };
  CodFisc += codiciMesi[mNasc];

  if(genere == "Mas"){
    CodFisc += gNasc.padStart(2, '0');
  } else {
    CodFisc += parseInt(gNasc)+40;
  }
}

function CalcolaCodCatast(){
  fetch(nomefile)
  .then(response => {
    if (!response.ok) {
      throw new Error('Impossibile aprire il file.');
    }
    return response.text();
  })
  .then(data => {
    let righe = data.split("\n");
    for(let riga of righe){
      let [nome, codice] = riga.split(";");
      if(nome.trim().toUpperCase() == lNasc){
        codCat = codice.trim();
        break;
      }
    }

    CodFisc += codCat;

    CalcolaCarContr();

    document.getElementById("Ris").innerText = CodFisc;
  })
  .catch(error => {
    console.error('Errore durante il caricamento del file:', error);
  });
}

function CalcolaCarContr(){
  const valoriDispari = {
    '0': 1,  '1': 0,  '2': 5,  '3': 7,  '4': 9,  '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
    'A': 1,  'B': 0,  'C': 5,  'D': 7,  'E': 9,  'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
    'K': 2,  'L': 4,  'M': 18, 'N': 20, 'O': 11, 'P': 3,  'Q': 6,  'R': 8,  'S': 12, 'T': 14,
    'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
  };

  const valoriPari = {
      '0': 0,  '1': 1,  '2': 2,  '3': 3,  '4': 4,  '5': 5,  '6': 6,  '7': 7,  '8': 8,  '9': 9,
      'A': 0,  'B': 1,  'C': 2,  'D': 3,  'E': 4,  'F': 5,  'G': 6,  'H': 7,  'I': 8,  'J': 9,
      'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19,
      'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25
  };

  const conversioneResto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let somma = 0;
  for(let i = 0; i < 15; i++){
      let carattere = CodFisc[i];
      if((i + 1) % 2 == 1){
          somma += valoriDispari[carattere];
      } else {
          somma += valoriPari[carattere];
      }
  }

  let resto = somma % 26;
  let carattereControllo = conversioneResto[resto];

  CodFisc += carattereControllo;
}