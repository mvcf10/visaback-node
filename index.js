const http = require('http');

var Merchant = require('./payment/merchant.js');
var Bill = require('./payment/bill.js');
var Creditcard = require('./payment/creditcard.js');

var m = new Merchant();
var b = new Bill();
var c = new Creditcard();

let app = http.createServer((req, res) => {  

    if (req.method == 'GET') {
        
        var caminho = '';
        if (req.url.lastIndexOf('?') > 0) {
            caminho = req.url.slice(0,req.url.lastIndexOf('?'));
        }

        else {
            caminho = req.url;	
            }

        switch(caminho) {
        case '/':
            res.end('Bem vindo a nossa API');
            break;
        case '/pagamento':
            
            var PaymentFinal = require('./payment/processpayment.js');
            var resposta = PaymentFinal.processPayment(function () {
                console.log('\nProcessPayment end.');
            }, false, m,b,c);
            
            response.writeHead(302, {
                'Location': 'http://localhost/visafront/pages/icons.html?status=ok'
                //add other headers here...
              });
            res.end('Opa... pagamento feito: ' + resposta);
            break;    
        default:
            res.end('Opa.. construindo');
        }


    }
    
      else if (req.method == 'POST') {
        res.end('Opa.. trabalhando no post  ');
      }
    
      else {
          res.end('Ainda não preparado para métodos diferentes de GET/POST');
    }
    
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');  
console.log('Node server running on port 3000');  