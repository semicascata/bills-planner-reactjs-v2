export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState === null) {
      console.log('state = null');
      return undefined;
    }

    const jsonState = JSON.parse(serializedState);

    return jsonState;
  } catch (err) {
    console.log(`error loadState: ${err}`);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(`error saveState: ${err}`);
  }
};