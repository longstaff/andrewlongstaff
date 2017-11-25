import Project from './Project';

export default [
  new Project(
    'project1',
    'AI Project',
    2000,
    (state) => {
      return true;
    },
    () => {}
  ),
  new Project(
    'project2',
    'Other Project',
    2000,
    (state) => {
      return true;
    },
    () => {}
  ),
  new Project(
    'project3',
    'Disabled Project',
    2000,
    (state) => {
      return true;
    },
    () => {}
  ),
];
