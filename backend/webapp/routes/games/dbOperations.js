const findGameWithSameNameInGameMaster = ({
  gameName
}) => {

}

const createGameMasterPlatformMapping = ({
  gameMasterId,
  platformId
}) => {

}

const createGameMasterEntry = ({
  gameName,
  iconUrl = null,
  genre = null,
  isFree = null
}) => {

}

const createGamePlatformMapping = ({
  gameId,
  platformId
}) => {

}

const createGame = ({
  gameMasterId,
  skillMasterId,
  totalPeopleRequiredToPlay,
  frequencyOfPlay,
  lookingFor,
  description
}) => {

}

const addUserHostingGame = ({
  userId,
  gameId,
}) => {

}

const addUserJoiningGame = ({
  userId,
  gameId
}) => {

}

module.exports = {
  findGameWithSameNameInGameMaster,
  createGameMasterPlatformMapping,
  createGameMasterEntry,
  createGamePlatformMapping,
  createGame,
  addUserHostingGame,
  addUserJoiningGame
}
