import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { flush } from 'next-style-loader/applyStyles';

export default class MyDocument extends Document {
  render() {
    const { nextStyle } = this.props;

    return (
      <html>
        <Head>
          { nextStyle.tag }
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/gridlex/2.4.1/gridlex.min.css"  />
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
          <link href="/stylesheets/style.css" rel="stylesheet" />
          <link href="/stylesheets/tooltip.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src='https://www.google.com/recaptcha/api.js'></script>
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = function (ctx) {
  const props = Document.getInitialProps(ctx);

  props.nextStyle = flush();

  return props;
};
