import { useState } from "react";
import "./index.css";

export default function ReplyComment(commentId) {
  const [reply, setReply] = useState(false);
  const [replyValue, setValue] = useState("");
  return (
    <div className="reply">
      <button className="replyBtn" onClick={() => setReply(!reply)}>
        Reply
      </button>
      {reply && (
        <div className="replyTextArea">
          <textarea
            onChange={(e) => {
              setValue(e.target.value);
            }}
            placeholder="what are you thoughts ?"
          ></textarea>
          <button
            className="sentReply"
            onClick={() => {
              alert(`You said ${replyValue}`);
            }}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
