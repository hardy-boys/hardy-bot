const exampleAction = () => ({
  type: 'EXAMPLE',
});

const exampleActionTwo = sampleData => ({
  type: 'EXAMPLE-TWO',
  payload: sampleData,
});

export default {
  exampleAction,
  exampleActionTwo,
};
