const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const csvjson = require('csvjson');
const url = require('url');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
    res.format({
    'text/html': function () {
    fs.readFile('gradovi.txt', (err, data) => {
      if(err) {
          console.log(err);
          throw err;
      }
      let jsonObj = csvjson.toObject(data.toString());
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<table><tr><th>Grad</th>');
      res.write('<th>Drzava</th>');

      for (var i = 0; i < jsonObj.length; i++) {
        res.write('<tr><td>'+jsonObj[i].Grad+'</td>');
        res.write('<td>'+jsonObj[i].Drzava+'</td>');
        //res.write('<td><form target="_self" method="POST" action="http://localhost:8085/:' + jsonObj[i].Grad +
        //  '">' + '<input type="submit" value="Obrisi"/></form></td>');
        //res.write('<td><form><input type="submit" value="Izmijeni"/></form></td>');
        res.write('</tr>');
      }
      res.write('</table>');
      res.send();
    });
  },

    'default': function () {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable')
    }
  })
});

app.listen(8080);


/*
app.post('/',function(req,res){
  res.format({
    'text/html': function () {
      let tijelo = req.body;
      let novaLinija = '\n'+tijelo['Grad']+','+tijelo['prezGrad']+
       ','+tijelo['adresa']+','+tijelo['broj_telefona'];
      fs.appendFile('gradovi.txt',novaLinija,function(err){
      if(err) throw err;
      //res.json({message:'Uspješno dodan red',data:novaLinija});
    });
    fs.readFile('gradovi.txt', (err, data) => {
      if(err) {
          console.log(err);
          throw err;
      }
      let jsonObj = csvjson.toObject(data.toString());
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<table ><tr><th>Grad</th>');
      res.write('<th>PrezGrad</th>');
      res.write('<th>Adresa</th>');
      res.write('<th>Broj telefona</th></tr>');

      for (var i = 0; i < jsonObj.length; i++) {
        res.write('<tr><td>'+jsonObj[i].Grad+'</td>');
        res.write('<td>'+jsonObj[i].prezGrad+'</td>');
        res.write('<td>'+jsonObj[i].adresa+'</td>');
        res.write('<td>'+jsonObj[i]['broj telefona']+'</td>');
        res.write('</tr>');
      }
      res.write('</table>');
      res.send();
    });
  },
    'default': function () {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable')
    }
  })
});

*/

/*
app.post('\/:\w+', function(req,res){
  res.format({
    'text/html': function () {
    fs.readFile('gradovi.txt', (err, data) => {
      if(err) {
          console.log(err);
          throw err;
      }
      let jsonObj = csvjson.toObject(data.toString());
      let Grad = req.url.substr(2);
      //console.log(Grad);
      var filtered = jsonObj.filter(function(data) {
        return data.Grad != Grad;
      });
      var podaci='Grad,prezGrad,adresa,broj telefona\n';
      for (var i = 0; i < filtered.length; i++) {
         podaci += filtered[i].Grad+','+filtered[i].prezGrad+
       ','+filtered[i].adresa+','+filtered[i]['broj telefona']+'\n';
      }
      fs.writeFile('gradovi.txt', podaci, function(){console.log('Uspjesno obrisano')});

      //citanje novih podataka
      fs.readFile('gradovi.txt', (err, data) => {
        if(err) {
            console.log(err);
            throw err;
        }
        let jsonObj = csvjson.toObject(data.toString());
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<table ><tr><th>Grad</th>');
        res.write('<th>PrezGrad</th>');
        res.write('<th>Adresa</th>');
        res.write('<th>Broj telefona</th>');
        res.write('<th>Obrisi</th>');
        res.write('<th>Izmijeni</th></tr>');

        for (var i = 0; i < jsonObj.length; i++) {
          res.write('<tr><td>'+jsonObj[i].Grad+'</td>');
          res.write('<td>'+jsonObj[i].prezGrad+'</td>');
          res.write('<td>'+jsonObj[i].adresa+'</td>');
          res.write('<td>'+jsonObj[i]['broj telefona']+'</td>');
          res.write('<td><form target="_self" method="POST" action="http://localhost:8085/:' + jsonObj[i].Grad +
           '">' + '<input type="submit" value="Obrisi"/></form></td>');
          res.write('<td><form><input type="submit" value="Izmijeni"/></form></td>');
          res.write('</tr>');
        }
        res.write('</table>');
        res.send();
      });
    });
  },
    'default': function () {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable')
    }
  })
});
*/





