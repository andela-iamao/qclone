import { Column, Button, Input } from 're-bulma';
import SearchResult from './SearchResult';
import Overlay from '../Overlay';
import SelectedList from './SelectedList';
import style from './style';

export default function SelectKnowledge(props) {
  const { handleSearchInput, searchQuery, searchResult, selected, handleSelect, onRemove, handleSubmit, handleCreate } = props;
  return (
    <div>
      <Overlay span="full" bg="light">
        <Column size="is6" style={style.col}>
          <h2>What topics do you know about?</h2>
          <p>Add your area of study, hobbies, skills and other interests.</p>
          <Column size="is4" style={style.searchCol}>
            <Input type="text" placeholder="Search for a topic" size="isSmall" onChange={handleSearchInput} />
          </Column>
          {!!searchQuery.length &&
            <SearchResult query={searchQuery} results={searchResult} handleSelect={handleSelect} handleCreate={handleCreate} />
          }
          <Column style={style.knowledgeCol(!selected.length)}>
            {!!selected.length &&
              <SelectedList selected={selected} onRemove={onRemove} />
            }
          </Column>
          <Column style={style.actionCol}>
            <Button color="isInfo" onClick={handleSubmit} >
              Continue
            </Button>
          </Column>
        </Column>
      </Overlay>
    </div>
  );
}
