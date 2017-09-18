import Link from 'next/link';
import style from './style';

export default function Header({ content, author, noAnswer, passedQuestions, id, passQuestion }) {
  const passed = passedQuestions.indexOf(id) > -1;
  return (
    <div>
      <div>
        {passed ?
          <div>
            <h3><a className="mute-link">{content}</a></h3>
            <span>You passed on answering this question ·
              <a className="mute-link" onClick={() => passQuestion(id)}>Undo</a>
            </span>
          </div>
          :
          <div>
            <span>Asked by {author}</span>
            <Link as={`/question/${id}`} href={`/question?id=${id}`}><h3>{content}</h3></Link>
          </div>
        }
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
