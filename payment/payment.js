var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('config/config.js');
var configuration = require(filePath);
var resposta = "";

var Payment = function () {
	
}

Payment.prototype.process = function (merchant, bill, creditcard) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.PaymentsApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'test_payment';

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
		processingInformation.commerceIndicator = 'internet';

		var subMerchant = new cybersourceRestApi.Ptsv2paymentsAggregatorInformationSubMerchant();
		subMerchant.cardAcceptorId = merchant.cardAcceptorId;
		subMerchant.country = merchant.country;
		subMerchant.phoneNumber = merchant.phoneNumber;
		subMerchant.address1 = merchant.address1;
		subMerchant.postalCode = merchant.postalCode;
		subMerchant.locality = merchant.locality;
		subMerchant.name = merchant.name;
		subMerchant.administrativeArea = merchant.administrativeArea;
		subMerchant.region = merchant.region;
		subMerchant.email = merchant.email;

		var aggregatorInformation = new cybersourceRestApi.Ptsv2paymentsAggregatorInformation();
		aggregatorInformation.subMerchant = subMerchant;
		aggregatorInformation.name = 'V-Internatio';
		aggregatorInformation.aggregatorId = '123456789';

		var amountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		amountDetails.totalAmount = bill.totalAmount;
		amountDetails.currency = bill.currency;

		var billTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
		billTo.country = bill.country;
		billTo.firstName = bill.firstName;
		billTo.lastName = bill.lastName;
		billTo.phoneNumber = bill.phoneNumber;
		billTo.address1 = bill.address1;
		billTo.postalCode = bill.postalCode;
		billTo.locality = bill.locality;
		billTo.administrativeArea = bill.administrativeArea;
		billTo.email = bill.email;
		billTo.address2 = bill.address2;
		billTo.district = bill.district;
		billTo.buildingNumber = bill.buildingNumber;
		billTo.company = bill.company;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		orderInformation.amountDetails = amountDetails;
		orderInformation.billTo = billTo;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
		var card = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCard();
		card.expirationYear = creditcard.expirationYear;
		card.number = creditcard.number;
		card.expirationMonth = creditcard.expirationMonth;
		card.securityCode = creditcard.securityCode;
		card.type = creditcard.type;
		paymentInformation.card = card;

		var request = new cybersourceRestApi.CreatePaymentRequest();
		request.clientReferenceInformation = clientReferenceInformation;
		request.processingInformation = processingInformation;
		request.aggregatorInformation = aggregatorInformation;
		request.orderInformation = orderInformation;
        request.paymentInformation = paymentInformation;
        request.processingInformation.capture = true;

		// if (enableCapture === true) {
		// 	request.processingInformation.capture = true;
		// }
        console.log('\n*************** Process Payment ********************* ');
        
        

		instance.createPayment(request, function (error, data, response) {
			if (error) {
				console.log('\nError in process a payment : ' + JSON.stringify(error));
			}
			else if (data) {
                console.log('\nStatus da Transação : ' + JSON.stringify(data.status));
                resposta = JSON.stringify(data.status);
			}
			//console.log('\nResponse of process a payment : ' + JSON.stringify(response));
            //console.log('\nResponse Code of process a payment : ' + JSON.stringify(response['status']));
            
            callback(error, data);
            
        });

        return resposta;
        
        
	} catch (error) {
		console.log(error);
	}
}


module.exports = Payment;