// const patternsAPI = 'http://localHost:3000/patterns'

// TODO: Comment Out when using DB
const fakeDB = [
  {
    beats: 2,
    clickedIds: [
      'row-1-cell-1',
      'row-2-cell-2',
      'row-1-cell-3',
      'row-2-cell-4',
    ],
    numOfCells: 4,
    patternTitle: 'Test',
    rows: 2,
    subs: 2,
    _id: '1',
  },
  {
    beats: 3,
    clickedIds: [
      'row-1-cell-1',
      'row-2-cell-2',
      'row-1-cell-3',
      'row-2-cell-4',
    ],
    numOfCells: 12,
    patternTitle: 'Test 2',
    rows: 2,
    subs: 4,
    _id: '2',
  },
];

const getPatterns = async () => {
  // COMMENTED OUT FOR TESTING W/O INTERNET
  // const response = await fetch(patternsAPI, {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // })

  // if (!response.ok) {
  //     const message = `An error has occurred: ${response.status}`;
  //     throw new Error(message);
  // }

  // const patterns = await response.json();

  // return patterns

  return fakeDB;
};

const saveNewPatternPOST = (body) => {
  console.log('IN SAVE PATTERN: ' + body);
  // fetch(`${patternsAPI}`, {
  //     method: 'POST',
  //     mode: 'cors',
  //     credentials: 'same-origin',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(body),

  // })
  // .then((res) => res.json())
  // .then((data) => {
  //     return data;
  // })
  // .catch(error => {
  //     console.log(`Error saving pattern: ${error}`);
  //     return error;
  // })
  fakeDB.push({ ...body, _id: fakeDB[fakeDB.length - 1]._id + 1 });
};

const updatePattern = (id, body) => {
  console.log('IN EDIT PATTERN: ' + body);
  // fetch(`${patternsAPI}/${id}`, {
  //     method: 'PUT',
  //     mode: 'cors',
  //     credentials: 'same-origin',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(body),

  // })
  //     .then((res) => res.json())
  //     .then((data) => {
  //         return data;
  //     })
  //     .catch(error => {
  //         console.log(`Error editing pattern: ${error}`);
  //         return error;
  //     })

  if (id !== null) {
    const itemToUpdateIdx = fakeDB.findIndex(
      (item) => Number(id) === Number(item._id)
    );

    fakeDB.splice(itemToUpdateIdx, 1, body);
  }
};

const deletePattern = async (id) => {
  console.log('IN DELETE PATTERN: ' + id);
  // const response = await fetch(`${patternsAPI}/${id}`, {
  //     method: 'DELETE',
  //     mode: 'cors',
  //     credentials: 'same-origin',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //     },
  // })

  // if (!response.ok) {
  //     const message = `An error has occurred DELETING item: ${response.status}`;
  //     throw new Error(message);
  // }

  // return await response.json();
  const itemToRemoveIdx = fakeDB.findIndex(
    (item) => Number(id) === Number(item._id)
  );

  fakeDB.splice(itemToRemoveIdx, 1);
};

export { getPatterns, saveNewPatternPOST, deletePattern, updatePattern };
