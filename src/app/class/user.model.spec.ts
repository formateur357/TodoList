import { User } from './user.model';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User("JeannotLeConquerant", "Jean", "Jean", 57, "jean@jean.jean", "Aa0000!","jeannot", ["Sait dire son nom", "et son prenom"])).toBeTruthy();
  });
});
