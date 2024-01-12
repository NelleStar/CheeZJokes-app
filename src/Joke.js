//A single joke, along with the vote up or down buttons
import "./Joke.css";

const Joke = ({ id, vote, votes, text }) => {
    const handleVoteUp = () => {
        vote(id, +1);
    }

    const handleVoteDown = () => {
        vote(id, -1);
    }

    return (
        <div className="Joke">
            <div className="Joke-voteArea">
                <button onClick={handleVoteUp}>👍🏼</button>
                <button onClick={handleVoteDown}>👎🏼</button>

                {votes}
            </div>

            <div className="Joke-text">
                {text}
            </div>
        </div>
    );
}

export default Joke;

