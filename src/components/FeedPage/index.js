import "./index.css";
import { useQuery } from "@apollo/client";
import { GET_FEED } from "../query/feed";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../query/addPost";
import Comments from "../Comments";
import VoteForPost from "../VoteForPost";

export default function FeedPage() {
  const token = sessionStorage.getItem("ACCESS_TOKEN");
  const { data, loading, error } = useQuery(GET_FEED);
  const [addPost, options] = useMutation(ADD_POST);
  const [isNeedToOpenModal, setModal] = useState(false);
  const [url, setUri] = useState();
  const [description, setDescr] = useState();

  return (
    <div className="FeedPage">
      {loading && <div className="loading"></div>}
      <div className="Feeds">
        {token && (
          <button
            className="addPostBtn"
            onClick={() => {
              setModal(!isNeedToOpenModal);
            }}
          >
            +
          </button>
        )}
        {data &&
          data.feed.links.map((elem, i) => {
            return (
              <div className="post" key={i}>
                <div className="postDescription">Desc : {elem.description}</div>
                <div className="postURL">Link: {elem.url}</div>
                <div className="postFooter">
                  <div className="postAuthor">
                    Author: {elem.postedBy.name} <br />
                    id: {elem.postedBy.id}
                  </div>
                  <div className="postVotes">
                    Votes : {elem.votes.length}
                    <VoteForPost props={elem.id} />
                  </div>
                </div>

                <Comments props={elem.votes} />
              </div>
            );
          })}
      </div>
      {isNeedToOpenModal && (
        <div className="overlay">
          <div className="modal">
            <div className="modalHeader">
              Add Post{" "}
              <button
                className="closeBtn"
                onClick={() => {
                  setModal(!isNeedToOpenModal);
                }}
              >
                x
              </button>
            </div>

            <div className="modalBody">
              {options.loading && <div className="loading"></div>}
              <form className="modalForm">
                URL :{" "}
                <input
                  placeholder="Link"
                  onChange={(e) => {
                    setUri(e.target.value);
                  }}
                />
                Description :{" "}
                <input
                  placeholder="Ignition is the first tool that..."
                  onChange={(e) => {
                    setDescr(e.target.value);
                  }}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addPost({
                      variables: {
                        url: url,
                        description: description,
                      },
                    }).then((data) => {
                      if (data) {
                        // console.log(options);
                        setModal(false);
                      }
                    });
                  }}
                >
                  Post
                </button>
              </form>
            </div>
            {/* <div className="modalFooter"></div> */}
          </div>
        </div>
      )}
    </div>
  );
}
