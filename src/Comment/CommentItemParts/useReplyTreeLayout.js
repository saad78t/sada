import { useEffect } from "react";

function useReplyTreeLayout({
  showReplies,
  replyRefs,
  containerRef,
  setBranchPositions,
  replying,
  setContainerHeight,
  visibleReplies,
}) {
  useEffect(() => {
    let animationFrameId;

    const updatePositions = () => {
      if (showReplies && replyRefs.current.length) {
        const positions = replyRefs.current.map((ref) => {
          if (ref) {
            const rect = ref.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            return rect.top - containerRect.top + 16;
          }
          return 0;
        });
        setBranchPositions(positions);
      }
    };

    if (containerRef.current) {
      animationFrameId = requestAnimationFrame(() => {
        setContainerHeight(containerRef.current?.offsetHeight);
        updatePositions();
      });

      const resizeObserver = new ResizeObserver(() => {
        setContainerHeight(containerRef.current?.offsetHeight);
        updatePositions();
      });

      resizeObserver.observe(containerRef.current);
      replyRefs.current.forEach((ref) => {
        if (ref) resizeObserver.observe(ref);
      });

      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
      };
    }
  }, [
    showReplies,
    replying,
    containerRef,
    replyRefs,
    setContainerHeight,
    setBranchPositions,
    visibleReplies,
  ]);
}

export default useReplyTreeLayout;
