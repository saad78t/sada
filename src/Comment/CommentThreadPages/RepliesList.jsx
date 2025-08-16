import styled from "styled-components";
import RenderComment from "./RenderComment";

const RepliesWrapper = styled.div`
  margin-left: 3rem;
`;

function RepliesList({ replies }) {
  return (
    <div>
      {replies?.length > 0 && (
        <RepliesWrapper>
          {replies.map((reply) => (
            <RenderComment key={reply.id} comment={reply} />
          ))}
        </RepliesWrapper>
      )}
    </div>
  );
}

export default RepliesList;
