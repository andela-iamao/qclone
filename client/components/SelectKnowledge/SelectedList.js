import Topic from './Topic';

export default function SelectedList({ selected, onRemove }) {
  return (
    <div>
      {selected.map((topic) => (
        <Topic key={topic.id} {...topic} onRemove={onRemove} />
      ))}
    </div>
  );
}
