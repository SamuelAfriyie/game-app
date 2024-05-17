export function sortRankingByScore(rankings: any[]) {
  return rankings.sort((a, b) => {
    return checkScoreAndSort(a, b);
  });
}

const checkScore = (o: any) => {
  return o.eventResults?.length > 0;
};

const checkScoreAndSort = (a: any, b: any) => {
  return (
    (checkScore(b) ? b.eventResults[b.eventResults?.length - 1]?.score : 0) -
    (checkScore(a) ? a.eventResults[a.eventResults?.length - 1]?.score : 0)
  );
};
