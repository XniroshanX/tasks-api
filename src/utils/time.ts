/**
 *
 * Utility function for get the time
 * difference by a give isoTime with
 * seconds
 */
export const getSecondsDifference = (isoTime: string): number => {
  const givenTime = new Date(isoTime);
  const currentTime = new Date();
  const diffMs = currentTime.getTime() - givenTime.getTime();
  return Math.floor(diffMs / 1000);
};
