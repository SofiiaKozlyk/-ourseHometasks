// import { createBrowserHistory } from 'history';

// export const history = createBrowserHistory();

import { createBrowserHistory } from 'history';

let history;

if (typeof window !== 'undefined') {
  history = createBrowserHistory();
}

export default history;