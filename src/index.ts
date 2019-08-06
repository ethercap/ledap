export * from './base/index';
import * as Vue from './platforms/vue/index';
export const LedapVue = Vue;
import {default as LedapApp} from './App';
export const App = LedapApp;
export {default as Theme} from './platforms/vue/Theme';
