import QuestionCard from './QuestionCard';

export default function TopQuestionSection(props) {
  return (
    <div className="answer-timeline">
      <div className="answer-section">
        <div className="answer-header">
          <div className="bg-quora-red">
            <span className="bg-star-icon">
            </span>
          </div>
          <div style={{ marginLeft: 10 }}>
            <a href="#" className="header-link" style={{ fontWeight: 'bold' }}>Top Questions for You</a>
          </div>
        </div>
        {props.questions.map((q) => <QuestionCard key={q.id} {...props} {...q} />)}
      </div>
      {props.moreQuestions.length > 0 &&
        <div className="answer-timeline-more-link" onClick={() => props.showMore()}>
          More <span className="fa fa-angle-down" />
        </div>
      }
      {props.questions.length > 8 && props.viewAll &&
        <div className="answer-timeline-more-link" onClick={() => props.showMore()}>
          View all <span className="fa fa-angle-right" />
        </div>
      }
    </div>
  );
}
