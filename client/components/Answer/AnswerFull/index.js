// import dynamic from 'next/dynamic';
import { Button, Column } from 're-bulma';
// import { graphql, compose } from 'react-apollo';
import Content from './content';
import Comment from './comment';
import Header from './header';
import About from './about';
import Layout from '../../Layout';
import style from '../style';
// import withData from '../../../../apollo/withData';
// import GraphQL from '../../../GraphQL';
import helper from '../../Home/helper';

// const Wysiwyg = dynamic(import('../../Wysiwyg'));

// const QUERY_GET_ANSWER = GraphQL.QUERY_GET_ANSWER([
//   'id',
//   'author { id, lastname, firstname }',
//   'question { content, followers}'
// ])

class AnswerFull extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tooltip: false
    };
    this.handleShare = this.handleShare.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
  }
  componentDidMount() {
    helper(this.toggleTooltip);
  }
  handleShare() {
  }

  toggleTooltip() {
    return this.setState({ tooltip: !this.state.tooltip });
  }

  render() {
    return (
      <Layout isAuth>
        <div style={style.answerFull.containerDiv}>
          <Column size="is5" style={style.answerFull.containerColumn}>
            <Header />
            <Content
              tooltip={this.state.tooltip}
              toggleTooltip={this.toggleTooltip}
              handleShare={this.handleShare}
            />
            <br />
            <Comment /><br />
            <Column className="link-col">
              <a href="#" style={style.answerFull.otherslink}>
                View 44 Other Answers to this Question <i className="fa fa-chevron-right" />
              </a>
            </Column>
            <About />
            <Column style={style.answerFull.lastCol}>
              <b>
                <Button state="isDisabled">Followers | 1</Button>
              </b>
            </Column>
          </Column>
        </div>
      </Layout>
    );
  }
}

// export default withData(compose(
//   graphql()
// )(AnswerFull));

export default AnswerFull;
