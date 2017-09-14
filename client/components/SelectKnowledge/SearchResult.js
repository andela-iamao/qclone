import { Columns, Column, Button } from 're-bulma';
import style from './style';

export default function SearchResult({ query, results, handleSelect, handleCreate }) {
  return (
    <Column size="is2" style={style.searchResultCol}>
      <div>
        <ul style={style.searchResultUL}>
          {results.map((result) => (
            <li key={result.id} style={style.searchList} className="darken-link-bg-hover li-link" onClick={() => handleSelect(result)}>
              <Column size="is9">
                {result.title}
              </Column>
              <img src={result.image} style={style.thumb}/>
            </li>))
          }
          <li style={style.searchList}>
            <Columns>
              <Column size="is4">
                <b>{query}</b>
              </Column>
              <Column size="is4">
                <Button color="isInfo" onClick={handleCreate} >
                  Create Topic
                </Button>
              </Column>
            </Columns>
          </li>
        </ul>
      </div>
    </Column>
  );
}
