export const setNormalizedValue = (entities: { [key: string]: any }, keys: string[], value: { uid: string }) => {
  entities[value.uid] = value;
  keys.push(value.uid);
};

export const deleteNormalizedValue = (entities: { [key: string]: any }, keys: string[], uid: string) => {
  delete entities[uid];
  keys.splice(keys.indexOf(uid), 1);
};
