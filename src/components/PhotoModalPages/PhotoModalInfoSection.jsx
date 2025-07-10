import styled from "styled-components";
import PhotoModalPostHeader from "./PhotoModalPostHeader";
import PhotoModalPostContent from "./PhotoModalPostContent";
import PhotoModalPostActions from "./PhotoModalPostActions";
import PhotoModalCommentsList from "./PhotoModalCommentsList";

const InfoSection = styled.div`
  flex: 1;
  background: white;
  padding: 1rem;
  overflow-y: auto;
  position: relative;
  padding-bottom: 100px; /* مسافة تكفي للفورم الثابتة أسفل */
`;

function PhotoModalInfoSection({ post }) {
  return (
    <InfoSection onClick={(e) => e.stopPropagation()}>
      <PhotoModalPostHeader post={post} />
      <PhotoModalPostContent post={post} />
      <PhotoModalPostActions post={post} />
      <PhotoModalCommentsList post={post} />
    </InfoSection>
  );
}

export default PhotoModalInfoSection;
