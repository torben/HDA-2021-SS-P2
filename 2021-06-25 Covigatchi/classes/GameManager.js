import { logScore, saveGame, hasSavedGame, loadGame, removeSaveGame } from "../helpers.js";

export default class GameManager {
  constructor() {
    this.state = "start";
    this.character = null;
    this.playerName = null;
    this.gameStartFrameCount = 0;
    this.gameEndFrameCount = 0;
    this.maxPoints = 50000;
    this.savedGameDuration = 0;
  }

  get isMenu() {
    return this.state === "start";
  }

  get isCharacterSelection() {
    return this.state === "characterSelection";
  }

  get isStarted() {
    return this.state === "started";
  }

  get isPlayerDead() {
    return this.state === "died";
  }

  get isGameComplete() {
    return this.state === "finished";
  }

  get isShowingHighscore() {
    return this.state === "highscore";
  }

  get isTutorial() {
    return this.state == "tutorial";
  }

  get gameDuration() {
    return this.gameEndFrameCount - this.gameStartFrameCount + this.savedGameDuration;
  }

  get isGameOver() {
    return this.isPlayerDead || this.isGameComplete
  }

  get pointsAmount() {
    return Math.max(this.maxPoints - this.gameDuration, 100);
  }

  get hasSavedGame() {
    return hasSavedGame();
  }

  startCharacterSelection() {
    this.state = "characterSelection";
  }

  startGame(frameCount) {
    this.gameStartFrameCount = frameCount;
    this.state = "started";
  }

  showHighscore() {
    this.state = "highscore";
  }

  playerDied(player, frameCount) {
    this.gameEndFrameCount = frameCount;
    this.logScore(0);
    this.state = "died";
    player.die();
    removeSaveGame();
  }

  playerFoundCure(frameCount) {
    this.gameEndFrameCount = frameCount;
    this.logScore(this.pointsAmount);
    this.state = "finished";
    removeSaveGame();
  }

  resetGame(playerStatus) {
    Object.keys(playerStatus).forEach(key => {
      playerStatus[key].percent = 1;
    });
    playerStatus.science.percent = 0;
    this.gameStartFrameCount = 0;
    this.gameEndFrameCount = 0;
    this.playerName = null;
    this.character = null;
    this.state = "start";
  }

  showTutorial() {
    this.state = "tutorial";
  }

  hideTutorial() {
    this.state = "started";
  }

  logScore(points) {
    logScore({ points, character: this.character, name: this.playerName });
  }

  saveGame(frameCount, playerStatus) {
    if (!this.isStarted) {
      return;
    }
    this.gameEndFrameCount = frameCount;
    const data = {
      status: {
        food: playerStatus.food.percent,
        relax: playerStatus.relax.percent,
        rest: playerStatus.rest.percent,
        pipikaka: playerStatus.pipikaka.percent,
        science: playerStatus.science.percent,
      },
      playerName: this.playerName,
      character: this.character,
      savedGameDuration: this.gameDuration
    };
    saveGame(data);
  }
  
  loadGame(frameCount, playerStatus) {
    const data = loadGame();
    if (!data) {
      return false
    }

    this.character = data.character;
    this.playerName = data.playerName;
    playerStatus.food.percent = data.status.food;
    playerStatus.relax.percent = data.status.relax;
    playerStatus.rest.percent = data.status.rest;
    playerStatus.pipikaka.percent = data.status.pipikaka;
    playerStatus.science.percent = data.status.science;
    this.savedGameDuration = data.savedGameDuration;
    this.startGame(frameCount);

    return true;
  }
}
