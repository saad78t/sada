import styled from "styled-components";

const RepliesWrapper = styled.div`
  margin-left: 3rem;
`;

function RepliesList({ replies, renderComment }) {
  return (
    <div>
      {replies.length > 0 && (
        <RepliesWrapper>
          {replies.map((reply) => renderComment(reply))}
        </RepliesWrapper>
      )}
    </div>
  );
}

export default RepliesList;
