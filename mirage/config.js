export default function() {
  this.post('/api/users', (db, request) => {
    var params = JSON.parse(request.requestBody);

    return db.users.create(params);
  });
  this.get('/api/users/:id');

  this.post('/api/users/sign_in', (db, request) => {
    var body = JSON.parse(request.requestBody);

    return {
      email: body.user,
      locale: "pt",
      token: "2EtNw7FMsm5E45DF1t3q",
      userId: 1
    }
  });

  this.post('/api/tokens', (db, request) => {
    var body = JSON.parse(request.requestBody);

    return {
      data: {
        id: body.data.id,
        type: "users",
        attributes: {
          email: body.data.attributes.email
        }
      }
    };
  });

  this.get('/api/cards', () => {
    return {
      data: []
    };
  });

  this.get('/workflows', () => {
    return {
      pagination: {
        pages: 0,
        total: 0,
        page: 1,
        size: 0
      },
      data: []
    }
  });

  this.get('/jobs', () => {
    return {
      pagination: {
        pages: 0,
        total: 0,
        page: 1,
        size: 0
      },
      data: []
    }
  });
}
