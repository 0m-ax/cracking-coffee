var appRoot = require('app-root-path');
var config = require(appRoot+'/config.json');
var r = require('rethinkdbdash')(config.rethinkdb);
r.tableCreate('users')
  .then(()=>r.table('users').indexCreate('email'))
  .then(()=>r.table('users').indexCreate('twitterid',r.row('twitter')('id')))
r.tableCreate('items')
  .then(()=>r.table('items').insert([{"cost":2.5,"id":"be5981e9-89ba-4bcf-a64f-29dc6d8f9342","name":"Latte","options":[{"default":0,"name":"Size","options":[{"cost":0,"name":"Small"},{"cost":0.25,"name":"Medium"},{"cost":0.5,"name":"Large"}]},{"default":0,"name":"Syrup","options":[{"cost":0,"name":"None"},{"cost":0.5,"name":"Pumpkin Spice"}]}]},{"cost":2.4,"id":"e10b1c5b-5f17-4e8d-a30f-7d8c65768968","name":"Flat White","options":[{"default":0,"name":"Size","options":[{"cost":0,"name":"Small"},{"cost":0.25,"name":"Medium"},{"cost":0.5,"name":"Large"}]},{"default":0,"name":"Syrup","options":[{"cost":0,"name":"None"},{"cost":0.5,"name":"Pumpkin Spice"}]}]},{"cost":2,"id":"05ff95bd-3bb7-4a06-bbea-f59ae3f3c6f7","name":"Americano","options":[{"default":0,"name":"Size","options":[{"cost":0,"name":"Small"},{"cost":0.25,"name":"Medium"},{"cost":0.5,"name":"Large"}]},{"default":0,"name":"Syrup","options":[{"cost":0,"name":"None"},{"cost":0.5,"name":"Pumpkin Spice"}]}]},{"cost":2.5,"id":"d39375b7-c380-4afc-b4c9-ec2c55de4974","name":"Cappuccino","options":[{"default":0,"name":"Size","options":[{"cost":0,"name":"Small"},{"cost":0.25,"name":"Medium"},{"cost":0.5,"name":"Large"}]},{"default":0,"name":"Syrup","options":[{"cost":0,"name":"None"},{"cost":0.5,"name":"Pumpkin Spice"}]}]}]))
r.tableCreate('stores')
  .then(()=>r.table('stores').insert([{"id":"e3a42337-9227-4180-bbd3-e6345f70cbd9","name":"Didsbury"},{"id":"0dd4bc21-fd4b-4818-979c-4a252ed72d1a","name":"Ancoats"}]))
r.tableCreate('orders')
