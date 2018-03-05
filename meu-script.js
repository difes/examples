$(function() {
  // a chave da sua aplicação
  var dife = new Dife('wxCTu7RfREkgdpSFM21ZE8vYfdC');

  var ID_PROJETOS = 19;
  // listagem dos "projetos realizados"
  dife.listValues(ID_PROJETOS, function (response) {
    // renderiza o template
    var formatado = Dife.template('projects-template', response.data.data);

    // adicionar o conteúdo renderizado
    $('#projects-content').html(formatado);
  }, function (response) {
    // exibir mensagem de erro
    // response.data.erros
    console.log(response.data.erros);
  }, 1, true);

  var ID_NOSSO_TIME = 20;
  // listagem do "nosso time"
  dife.listValues(ID_NOSSO_TIME, function (response) {
    // renderiza o template
    var result = Dife.template('team-template', response.data.data);

    // adicionar o conteúdo renderizado
    $('#team-content').html(result);
  }, function (response) {
    // exibir mensagem de erro
    // response.data.erros
    console.log(response.data.erros);
  }, 1, true);

  var ID_FORMULARIO = 21;
  // ao enviar o formulário
  $('#form-contact').on('submit', function (event) {
    event.preventDefault();
    $form = $(this);

    // captura os dados dos campos
    var dados = {
      nome: $('#nome').val(),
      e_mail: $('#email').val(),
      assunto: $('#assunto').val(),
      mensagem: $('#mensagem').val(),
    };

    // desabilita o botão e exibe o carregando
    $form.find('button').prop('disabled', true).find('.fa-spinner').removeClass('invisible');

    // envia o formulário do Dife
    dife.form(ID_FORMULARIO, dados, function (response) {
      // limpar o formulário (usando jQuery)
      $form[0].reset();

      // exibe mensagem de sucesso
      $form.find('.alert').attr('class', 'alert alert-success').text('Sua mensagem foi enviada com sucesso.');

      // habilita o botão novamente
      $form.find('button').prop('disabled', false).find('.fa-spinner').addClass('invisible');
    }, function (response) {
      // exibir mensagem de erro
      // response.data.erros
      console.log(response.data.erros);

      // exibe mensagem de erro
      $form.find('.alert').attr('class', 'alert alert-danger').text(response.data.erros);

      // habilita o botão novamente
      $form.find('button').prop('disabled', false).find('.fa-spinner').addClass('invisible');
    });

  });
});