import { useAppSelector, useAppDispatch } from '../app/hooks';
import { updateCurrent, search, selectSearchTerm, selectSearchCurrent, selectSearchSuggestions, suggestionsAsync} from './search';

export function SearchBox() {
  const term = useAppSelector(selectSearchTerm);
  const current = useAppSelector(selectSearchCurrent);
  const suggestions = useAppSelector(selectSearchSuggestions);
  const dispatch = useAppDispatch();
  const dispatchDebug = (msg: string, action: any) => {
    console.log(msg);
    dispatch(action);
  }

  return (
    <div>
      <input
        onChange={(e) => dispatch(updateCurrent(e.target.value)) && dispatch(suggestionsAsync(e.target.value))} 
        onKeyDown={(e) => e.key === "Enter" && dispatch(search())} 
        />
      <div> Term: {term}</div>
      <div> Current: {current}</div>
      <ul>{
        suggestions.slice(0, 5).map(a => <li>{a}</li>)
      }</ul>
    </div>
  );
}
