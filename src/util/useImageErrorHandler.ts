import React, { useCallback } from "react";

/**
 * useImageErrorHandler Hook
 *
 * A custom hook that returns an event handler to hide an image if it fails to load.
 *
 * @example
 * // Basic usage
 * const ImageComponent = () => {
 *   const handleError = useImageErrorHandler();
 *
 *   return (
 *     <img
 *       src="path/to/image.jpg"
 *       onError={handleError}
 *       alt="Example Image"
 *     />
 *   );
 * };
 *
 * @returns {Function} A callback function to handle the image error event
 */
export const useImageErrorHandler = () => {
  return useCallback((event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.style.display = "none"; // Hide the image if it fails to load
    // @TODO: Provide a fallback image:
    // event.currentTarget.src = 'path/to/fallback/image.jpg';
  }, []);
};
