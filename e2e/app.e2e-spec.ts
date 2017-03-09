import { PowerPage } from './app.po';

describe('power App', function() {
  let page: PowerPage;

  beforeEach(() => {
    page = new PowerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
