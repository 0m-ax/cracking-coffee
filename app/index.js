const express = require('express');
var app = express.Router();
app.get('/',(req,res)=>{
  res.render('index',{nav:[
    {
      "text":"Home",
      "selected":true,
      "link":"/"
    },
    {
      "text":"Stores",
      "selected":false,
      "link":"stores"
    },
    {
      "text":"Order online",
      "selected":false,
      "link":"stores-select"
    }
  ]
  });
})


app.get('/stores',(req,res)=>{
  res.render('stores',{nav:[
    {
      "text":"Home",
      "selected":false,
      "link":"/"
    },
    {
      "text":"Stores",
      "selected":true,
      "link":"stores"
    },
    {
      "text":"Order online",
      "selected":false,
      "link":"stores-select"
    }
  ]
  });
})

app.get('/stores-select',(req,res)=>{
  res.render('stores-select',{nav:[
    {
      "text":"Home",
      "selected":false,
      "link":"/"
    },
    {
      "text":"Stores",
      "selected":false,
      "link":"stores"
    },
    {
      "text":"Order online",
      "selected":true,
      "link":"stores-select"
    }
  ]
  });
})


app.get('/items',(req,res)=>{
  res.render('items',{nav:[
    {
      "text":"Home",
      "selected":false,
      "link":"/"
    },
    {
      "text":"Stores",
      "selected":false,
      "link":"stores"
    },
    {
      "text":"Order online",
      "selected":true,
      "link":"stores-select"
    }
  ]
  });
})


app.get('/customise',(req,res)=>{
  res.render('customise',{nav:[
    {
      "text":"Home",
      "selected":false,
      "link":"/"
    },
    {
      "text":"Stores",
      "selected":false,
      "link":"stores"
    },
    {
      "text":"Order online",
      "selected":true,
      "link":"stores-select"
    }
  ]
  });
})

app.get('/cart',(req,res)=>{
  res.render('cart',{nav:[
    {
      "text":"Home",
      "selected":false,
      "link":"/"
    },
    {
      "text":"Stores",
      "selected":false,
      "link":"stores"
    },
    {
      "text":"Order online",
      "selected":true,
      "link":"stores-select"
    }
  ]
  });
})

app.get('/pay',(req,res)=>{
  res.render('pay',{nav:[
    {
      "text":"Home",
      "selected":false,
      "link":"/"
    },
    {
      "text":"Stores",
      "selected":false,
      "link":"stores"
    },
    {
      "text":"Order online",
      "selected":true,
      "link":"stores-select"
    }
  ]
  });
})

app.get('/waiting',(req,res)=>{
  res.render('waiting',{nav:[
    {
      "text":"Home",
      "selected":false,
      "link":"/"
    },
    {
      "text":"Stores",
      "selected":false,
      "link":"stores"
    },
    {
      "text":"Order online",
      "selected":true,
      "link":"stores-select"
    }
  ]
  });
})

app.get('/ready',(req,res)=>{
  res.render('ready',{nav:[
    {
      "text":"Home",
      "selected":false,
      "link":"/"
    },
    {
      "text":"Stores",
      "selected":false,
      "link":"stores"
    },
    {
      "text":"Order online",
      "selected":true,
      "link":"stores-select"
    }
  ]
  });
})

app.get('/served',(req,res)=>{
  res.render('served',{nav:[
    {
      "text":"Home",
      "selected":false,
      "link":"/"
    },
    {
      "text":"Stores",
      "selected":false,
      "link":"/stores"
    },
    {
      "text":"Order online",
      "selected":true,
      "link":"/stores-select"
    }
  ]
  });
})

app.use('/',require('./auth.js'))
app.use('/account',
  require('connect-ensure-login').ensureLoggedIn(),
  require('./account/')
)
module.exports= app;
