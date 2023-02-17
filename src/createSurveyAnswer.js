
const createSurveyAnswer = `
mutation CreateSurveyAnswer($input: CreateSurveyAnswerInput!) {
  createSurveyAnswer(input: $input) {
    id
    question1
    question2
    question3
  }
}
`;

class SurveyForm extends React.Component {
  state = {
    question1: '',
    question2: '',
    question3: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    // Get the survey answer from the state
    const { question1, question2, question3 } = this.state;

    // Call the createSurveyAnswer mutation
    try {
      const result = await API.graphql(
        graphqlOperation(createSurveyAnswer, {
          input: {
            question1,
            question2,
            question3
          }
        })
      );

      console.log(result);

      // Show a success message or redirect the user to a different page
      // ...
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="question1"
          placeholder="Question 1"
          value={this.state.question1}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="question2"
          placeholder="Question 2"
          value={this.state.question2}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="question3"
          placeholder="Question 3"
          value={this.state.question3}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
