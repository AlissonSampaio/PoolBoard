import axios from "axios";
import { useEffect, useState } from "react";
import { isEmpty } from "../../utils/utilities";

export type Player = {
  id: string;
  name: string;
  url_image: string;
};

type Match = {
  player_id: string;
  player_points: number;
  opponent_id: string;
  opponent_points: number;
};

export default () => {
  const [loadingMatchData, setLoadingMatchData] = useState(false);
  const [errorLoadingMatchData, setErrorLoadingMatchData] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [player, setPlayer] = useState<Player>();
  const [playerPoints, setPlayerPoints] = useState<number>();
  const [opponent, setOpponent] = useState<Player>();
  const [opponentPoints, setOpponentPoints] = useState<number>();

  useEffect(() => {
    getPlayersList();
  }, []);

  const getPlayersList = async () => {
    try {
      const { data } = await axios.get<Player[]>(
        "http://172.16.3.50:666/players"
      );
      setPlayers(data);
      setPlayer(data[0]);
      setOpponent(data[1]);
      setupMatch(data[0].id, data[1].id);
    } catch (error) {
      console.log("ERRROOOOU");
      console.log(error);
    }
  };

  const setupMatch = async (player_id: string, opponent_id: string) => {
    const response = await getMatchPlayersPoints(player_id, opponent_id);
    if (!response) {
      createMatch(player_id, opponent_id);
    }
  };

  const getMatchPlayersPoints = async (
    player_id: string,
    opponent_id: string
  ) => {
    if (loadingMatchData) {
      return;
    }
    setLoadingMatchData(true);
    setErrorLoadingMatchData(false);
    try {
      const { data } = await axios.get<Match>(
        `http://172.16.3.50:666/match/${player_id}/${opponent_id}`
      );
      if (player?.id == data.player_id) {
        setPlayerPoints(data.player_points);
        setOpponentPoints(data.opponent_points);
      } else {
        setPlayerPoints(data.opponent_points);
        setOpponentPoints(data.player_points);
      }
      if (isEmpty(data)) {
        setLoadingMatchData(false);
        return false;
      }
    } catch (err) {
      setErrorLoadingMatchData(true);
    }
    setLoadingMatchData(false);
    return true;
  };

  // const updateMatchPlayerPoints = async (
  //   player_id: string,
  //   opponent_id: string
  // ) => {

  // };

  const createMatch = async (player_id: string, opponent_id: string) => {
    if (loadingMatchData) {
      return;
    }
    setLoadingMatchData(true);
    setErrorLoadingMatchData(false);
    try {
      await axios.post(`http://172.16.3.50:666/match`, {
        player_id: player_id,
        player_points: 0,
        opponent_id: opponent_id,
        opponent_points: 0,
      });
      setPlayerPoints(0);
      setOpponentPoints(0);
    } catch (err) {
      setErrorLoadingMatchData(true);
    }
    setErrorLoadingMatchData(false);
    setLoadingMatchData(false);
  };

  const changePlayer = async (player_param: Player) => {
    setPlayer(player_param);
    setupMatch(player_param.id, opponent!.id);
  };

  const changeOpponent = async (player_param: Player) => {
    setOpponent(player_param);
    setupMatch(player!.id, player_param.id);
  };

  const changePoints = async () => {
    setPlayerPoints((player_points) =>
      player_points ? player_points! + 1 : 1
    );
  };

  const leftList = players?.filter((player) => {
    return player.id !== opponent!.id;
  });

  const rightList = players?.filter((opponent) => {
    return opponent.id !== player!.id;
  });

  return {
    loadingMatchData,
    player,
    opponent,
    errorLoadingMatchData,
    playerPoints,
    changePoints,
    opponentPoints,
    changePlayer,
    leftList,
    rightList,
    changeOpponent,
  };
};
