import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import 'antd/dist/antd.min.css';

import Router from "./router";
import i18n from "./translation";

const App = () => (
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <Router />
    </I18nextProvider>
  </BrowserRouter>
);

const htmlRoot = document.getElementById('root')
if (htmlRoot === null) throw new Error('Root container missing in index.html')

const root = createRoot(htmlRoot);
root.render(<App />)
