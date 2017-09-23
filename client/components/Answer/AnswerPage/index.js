// import dynamic from 'next/dynamic';
// import Link from 'next/link';
// import { Button, Column, Modal } from 're-bulma';
// import { graphql, compose } from 'react-apollo';
// import Content from './content';
// import Comment from './comment';
// import Header from './header';
// import About from './about';
import Layout from '../../Layout';
// import style from '../style';
import withData from '../../../../apollo/withData';
// import GraphQL from '../../../GraphQL';
// import helper from '../../Home/helper';

// const Wysiwyg = dynamic(import('../../Wysiwyg'));

class AnswerPage extends React.Component {

  render() {
    // const { answer } = this.props;
    // const { deleted, deleteModal, editing, content } = this.state;

    // if (answer.getAnswer) {
    return (
      <Layout isAuth>
        <h3>Ooops!!! Sorry about this but the answer page is under construction</h3>
      </Layout>
    );
    // }
    // return (
    //   <div />
    // );
  }
}

export default withData(AnswerPage);
