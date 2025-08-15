import styled from "styled-components";

const RepliesWrapper = styled.div`
  margin-left: 3rem;
`;

function RepliesList({
  replies,
  // eslint-disable-next-line no-unused-vars
  RenderComment,
}) {
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
