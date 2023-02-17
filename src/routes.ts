import { Converter } from './pages/converter';
import { History } from './pages/history';
import { ERoutes } from './types/enums';

export const routes = [
  {
    path: ERoutes.сonverter,
    component: Converter,
    title: 'Currency converter'
  },
  {
    path: ERoutes.history,
    component: History,
    title: 'View conversion history'
  }
];
