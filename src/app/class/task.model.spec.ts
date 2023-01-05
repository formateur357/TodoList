import { Task } from './task.model';

describe('Task', () => {
  it('should create an instance', () => {
    expect(new Task("Chauffer le dancefloor", true, "Danser le woogie.", new Date())).toBeTruthy();
  });

  it('should create an instance with completed set to true', () => {
    expect(new Task("Chauffer le dancefloor", true, "Danser le woogie.", new Date()).completed).toBeTruthy();
  });
});
