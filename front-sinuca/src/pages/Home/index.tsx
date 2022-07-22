import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";

import vs from "../../assets/images/vs.png";
import "./styles.css";
import { data } from "autoprefixer";

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

export default function Home() {
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
        "http://localhost:666/players"
      );
      setPlayers(data);
      setPlayer(data[0]);
      setOpponent(data[1]);
      getMatchPlayersPoints(data[0].id, data[1].id);
    } catch (error) {
      console.log("ERRROOOOU");
      console.log(error);
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
        `http://localhost:666/match/${player_id}/${opponent_id}`
      );
      setPlayerPoints(data.player_points);
      setOpponentPoints(data.opponent_points);
    } catch (err) {
      setErrorLoadingMatchData(true);
    }
    setLoadingMatchData(false);
  };

  const createMatch = async (player_id: string, opponent_id: string) => {
    if (loadingMatchData) {
      return;
    }
    setLoadingMatchData(true);
    setErrorLoadingMatchData(false);
    try {
      await axios.post(`http://localhost:666/match`, {
        player_id: player_id,
        player_points: 0,
        opponent_id: opponent_id,
        opponent_points: 0,
      });
    } catch (err) {
      setErrorLoadingMatchData(true);
    }
    setErrorLoadingMatchData(false);
  };

  const changePlayer = async (player_param: Player) => {
    setPlayer(player_param);
    getMatchPlayersPoints(player_param.id, opponent!.id);
  };

  const changeOpponent = async (player_param: Player) => {
    setOpponent(player_param);
    getMatchPlayersPoints(player!.id, player_param.id);
  };

  const changePoints = async () => {
    setPlayerPoints((player_points) =>
      player_points ? player_points! + 1 : 1
    );
  };

  if (loadingMatchData || !Boolean(player) || !Boolean(opponent)) {
    return <p>CARREGANDO...</p>;
  }

  if (errorLoadingMatchData) {
    return (
      <>
        <strong>Vixe</strong>
        <button>Tentar novamente</button>
      </>
    );
  }

  const leftList = players?.filter((player) => {
    return player.id !== opponent!.id;
  });

  const rightList = players?.filter((opponent) => {
    return opponent.id !== player!.id;
  });

  return (
    <>
      <h1>POOL SCOREBOARD</h1>
      <div className="flex flex-row items-center justify-center">
        {player ? (
          <div>
            <Card
              player={player}
              playerPoints={playerPoints!}
              onClickFunction={changePoints}
            ></Card>
            <select
              value={player?.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event) => {
                changePlayer(leftList[parseInt(event.target.value)]);
              }}
            >
              {leftList.map((player, index) => {
                return <option value={index}>{player.name}</option>;
              })}
            </select>
          </div>
        ) : null}
        <img src={vs} style={{ alignSelf: "center", maxHeight: "250px" }}></img>
        {opponent ? (
          <div>
            <Card
              player={opponent}
              playerPoints={opponentPoints!}
              onClickFunction={changePoints}
            ></Card>
            <select
              name="players"
              id="players"
              value={opponent?.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event) => {
                changeOpponent(rightList[parseInt(event.target.value)]);
              }}
            >
              {rightList.map((player, index) => {
                return <option value={index}>{player.name}</option>;
              })}
            </select>
          </div>
        ) : null}
      </div>
    </>
  );
}
