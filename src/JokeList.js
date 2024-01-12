// a List of jokes
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";
import { useEffect, useState } from "react";

const JokeList = ({ numJokesToGet = 5 }) => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getJokes = async () => {
    try {
      let newJokes = [];
      let seenJokes = new Set();

      while (newJokes.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });

        let { ...joke } = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          newJokes.push({ ...joke, votes: 0 });
        } else {
          console.log("Duplicate Joke Found!");
        }
      }

      setJokes(newJokes);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getJokes();
  }, []);

  // empty joke list, set loading state and call getJokes()
  const generateNewJokes = async () => {
    setIsLoading(true);
    await getJokes();
  };

  // change vote for this id by delta(+1 or -1)
  const vote = (id, delta) => {
    setJokes((prevJokes) =>
      prevJokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    );
  };

  // rendering logic
  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  return (
    <div className="JokeList">
      <button className="JokeList-getmore" onClick={generateNewJokes}>
        Get New Jokes
      </button>

      {isLoading ? (
        <div>
          <i>⌚</i>
        </div>
      ) : (
        sortedJokes.map((j) => (
          <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
            votes={j.votes}
            vote={vote}
          />
        ))
      )}
    </div>
  );
};

export default JokeList;
