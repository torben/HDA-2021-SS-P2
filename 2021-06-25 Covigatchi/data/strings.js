export default {
  needs: {
    food: "Hunger",
    relax: "Entspannung",
    rest: "Schlaf",
    pipikaka: "Pipikaka",
    science: "Forschung nach Virus-Killer"
  },
  menu: {
    buttons: {
      continueGame: "Spiel laden",
      startGame: "Spiel starten",
      highscore: "Highscore"
    },
    footer: {
      referenceInfo: "Grafik basierend auf RimWorld",
      author: "TT 2021"
    }
  },
  characterSelection: {
    buttons: {
      connic: "Connic",
      covick: "Covick"
    },
    introduction: "Du wachst eines Tages auf und hast eine grandiose Idee für ein Gegenmittel gegen Covid-19. Gepackt voller Tatendran legst du los und stürzt dich in die Forschung. Aber beachte deine Bedürfnisse - du darfst auf keinen Fall aufgeben.\nDas Schicksal der Menscheit hängt von dir ab!",
    chooseCharacter: "Spielfigur wählen:"
  },
  gameResult: {
    buttons: {
      menu: "Zum Menü"
    },
    failed: {
      title: "Das Ende",
      result: "Du hattest einen Nevenzusammenbruch! Du konntes kein Heilmittel finden. Du bist aber fest motiviert es noch mal zu versuchen."
    },
    success: {
      title: "Herzlichen Glückwunsch",
      result: "Du hast ein Heilmittel gefunden! Du machst dich gleich an die Produktion um Covid-19 schnell aus dieser Welt zu verbannen."
    },
    daysCount: "Tage im Spiel:",
    scienceProgress: "Forschugsfortschritt:",
    pointsAmount: "Gesamtpunkte:"
  },
  highscore: {
    buttons: {
      done: "Zurück"
    },
    title: "Highscore:",
    noRecords: "Noch kein Highscore vorhanden.",
    time: "Uhr"
  },
  tutorialButton: {
    show: "?",
    hide: "ｘ"
  }
};
