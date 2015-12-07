import <%= camelCaseName %>Module from './<%= name %>.js';

describe('<%= camelCaseName %>Service', ()=>{
  let <%= upCaseName %>Service;

  beforeEach(window.module(<%= camelCaseName %>Module.name));

  beforeEach(inject((_<%= upCaseName %>Service_) => {
    <%= upCaseName %>Service = _<%= upCaseName %>Service_;
  }))

  it('should be imported and have a method', function() {
    <%= upCaseName %>Service.method.should.exist;
  });
});
