import { useMutation } from "@apollo/client";
import { VOTE_POST } from "../query/votePost";
import "./index.css";

export default function VoteForPost(props) {
  const postId = props.props;
  const [likePost, { loading }] = useMutation(VOTE_POST);
  if (loading) {
    return <div className="loading"></div>;
  }

  return (
    <button
      className="voteBtn"
      onClick={() => {
        likePost({
          variables: {
            linkId: postId,
          },
        });
      }}
    >
      👍🏻
    </button>
  );
}
