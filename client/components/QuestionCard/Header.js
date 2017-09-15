import style from './style';

export default function Header({ content, author, noAnswer }) {
  return (
    <div>
      <div>
        <span>Asked by {author}</span>
        <h3>{content}</h3>
      </div>
      {!noAnswer &&
        <div style={style.user}>
          <img style={style.avatar} src="https://qph.ec.quoracdn.net/main-thumb-288757574-50-mthzdthlzqfueobqjinymcoudzhvwzgw.jpeg" />
          <span>
            Asim Qureshi, CEO LaunchPad, 5 $1-10m startups (including Jibble.io)
          </span>
        </div>
      }
      <div style={{clear: 'both'}} />
      <br />
    </div>
  );
}
