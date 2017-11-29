import Button from './Button';
import {
  BUTTON_CODE,
  BUTTON_TEA,
  BUTTON_COFFEE,
  BUTTON_STACK,
  BUTTON_GITHUB,
} from '../constants';

export default [
  new Button(
    BUTTON_CODE,
    'Write Code',
    1,
  ),
  new Button(
    BUTTON_TEA,
    'Drink Tea',
    20,
  ),
  new Button(
    BUTTON_COFFEE,
    'Drink Coffee',
    40,
  ),
  new Button(
    BUTTON_STACK,
    'Research Stack Overflow',
    100,
  ),
  new Button(
    BUTTON_GITHUB,
    'Research Github',
    500,
  )
];
