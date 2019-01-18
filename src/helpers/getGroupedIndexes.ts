interface IGroup {
  comp: any;
  indexes: number[];
}

export function getGroupedIndexes(items: any[], key?: string): number[][] {
  return items
    .reduce<IGroup[]>((state, tempItem, tempIndex) => {
      let tempGroup = state[state.length - 1];
      const tempComp = key ? tempItem[key] : tempItem;
      if (!tempGroup || tempGroup.comp !== tempComp) {
        tempGroup = { comp: tempComp, indexes: [] };
        state.push(tempGroup);
      }
      tempGroup.indexes.push(tempIndex);
      return state;
    }, [])
    .map(({ indexes }) => indexes);
}
