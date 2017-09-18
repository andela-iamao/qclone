export default function Header({ username, handleQuestionInput, question }) {
  return (
    <div>
      <span>{username} asks</span><br /><br />
      <input
        type="text"
        value={question}
        className="no-border bold-text full-width"
        autoFocus
        onChange={handleQuestionInput} />
      <hr />
    </div>
  );
}
