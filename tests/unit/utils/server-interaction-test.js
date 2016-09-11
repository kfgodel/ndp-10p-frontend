/* jshint expr:true */
/* global jQuery */
import {expect} from "chai";
import {describe, it, beforeEach} from "mocha";
import ServerInteraction from "ateam-ember-resource/rest/server-interaction";

describe('ServerInteraction', function () {

  let deferred;
  let valor;
  let interaction;

  beforeEach(function () {
    deferred = jQuery.Deferred();
    valor = false;
    interaction = new ServerInteraction(deferred.promise());
  });

  it('permite definir un callback para una llamada exitosa', function () {
    interaction.whenSucceeded(function (resultado) {
      valor = resultado;
    });

    deferred.resolve('algo');
    expect(valor).to.equal('algo');
  });

  it('permite definir un callback para una llamada fallida por un status 401', function () {
    interaction.whenUnauthorized(function () {
      valor = 'no autorizado';
    });

    deferred.reject({status: 401});
    expect(valor).to.equal('no autorizado');
  });

  it('permite definir un callback para una llamada fallida por cualquier otra razon', function () {
    interaction.whenFailed(function () {
      valor = 'fallida';
    });

    deferred.reject({status: 403});
    expect(valor).to.equal('fallida');
  });

  it('permite definir un callback para reintentar una accion luego de status 401', function () {
    interaction
      .whenInterruptedAndReauthenticated(function () {
        valor = 'reautenticado';
      })
      .whenUnauthorized(function (afterAutentication) {
        afterAutentication();
      });

    deferred.reject({status: 401});
    expect(valor).to.equal('reautenticado');
  });


});
