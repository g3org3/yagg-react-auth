import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { addLocaleData, IntlProvider } from 'react-intl'
import en from 'react-intl/locale-data/en'
import es from 'react-intl/locale-data/es'
import fr from 'react-intl/locale-data/fr'


// Main Component
import Router from './Router';
import { Provider } from 'react-redux';
import store from './store/';
import theme from './config/theme';
import messages from './messages'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { flattenMessages } from './utils'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


addLocaleData([...en, ...es, ...fr]);
let locale = 
  (localStorage.getItem('__jarvis-dash__.language'))
  || (navigator.languages && navigator.languages[0])
  || navigator.language
  || navigator.userLanguage
  || 'en-US';

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
        <Router />
      </IntlProvider>
    </MuiThemeProvider>
  </Provider>
  ,document.getElementById('root')
);
registerServiceWorker();
