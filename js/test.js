const completeTask = function(id) {
  document.getElementById(id).className = 'fa fa-check';
};

const cs = new CatSnake('ws://localhost:3081', {
    commonName: 'Tester123',
    clientId: 'tester123',
});


cs.on(() => {
  cs.authenticate('catsaretryingtokillusall');

  completeTask('1');

  cs.subscribe('Testing', msg => {
    console.log(msg);
    if (msg.metadata.type === 'publish') {
      if (msg.message.test === 'pass') {
        completeTask('2');
        completeTask('10');
        if (msg.metadata.sender === 'Tester123') {
          completeTask('4');
        }
      }
    }

    if (msg.metadata.type === 'history') {
      if (msg.history.length) {
        completeTask('5');
        completeTask('6');

      }
    }

    if (msg.metadata.type === 'clients') {
      if (msg.clients.length) {
        completeTask('7');
        completeTask('8');
      }
    }
  });

  cs.publish('Testing', {test: 'pass'}).then(() => {
    completeTask('3');
  });

  cs.info('Testing');
  cs.history('Testing', 1);


  let gotPrivateMessage = false;
  cs.subscribe('PrivateTesting', msg => {
    gotPrivateMessage = true;
    if (msg.message.test === 'passed!') {
      completeTask('12');
    }
  }, {
    accessToken: 'weqrwerqwer',
    private: true,
  });

  cs.deny('PrivateTesting', 'tester123', 'weqrwerqwer');

  cs.publish('PrivateTesting', {test: 'pass'});
  setTimeout(() => {
    if (!gotPrivateMessage) {
      completeTask('15');
      completeTask('14');
      completeTask('13');
    }

    cs.grant('PrivateTesting', 'tester123', 'weqrwerqwer');

    cs.publish('PrivateTesting', {test: 'passed!'});
  }, 1000);
});
