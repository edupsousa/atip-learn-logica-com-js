class FormularioRegistro {
  constructor() {
    this.inputNome = document.getElementById("nome");
    this.inputEmail = document.getElementById("email");
    this.inputSenha = document.getElementById("senha");
    this.inputConfirmarSenha = document.getElementById("confirmar-senha");
    this.inputDataNascimento = document.getElementById("data-nascimento");
    this.divErros = document.getElementById("erros-container");
    this.ulErros = document.getElementById("lista-erros");
  }

  mostrarErros() {
    this.divErros.style.display = "block";
  }

  ocultarErros() {
    this.divErros.style.display = "none";
  }

  adicionarErro(mensagem) {
    const li = document.createElement("li");
    li.textContent = mensagem;
    this.ulErros.appendChild(li);
  }

  limparErros() {
    this.ulErros.innerHTML = "";
  }

  validarNome() {
    if (this.inputNome.value.length < 3) {
      this.adicionarErro("Nome deve ter no mínimo 3 caracteres");
      return false;
    }
    return true;
  }

  validarEmail() {
    if (!this.inputEmail.value.includes("@")) {
      this.adicionarErro("Email inválido");
      return false;
    }
    return true;
  }

  validarSenha() {
    if (this.inputSenha.value.length < 8) {
      this.adicionarErro("Senha deve ter no mínimo 8 caracteres");
      return false;
    }
    return true;
  }

  validarConfirmarSenha() {
    if (this.inputSenha.value !== this.inputConfirmarSenha.value) {
      this.adicionarErro("Senhas não conferem");
      return false;
    }
    return true;
  }

  validarDataNascimento() {
    const dataNascimento = new Date(this.inputDataNascimento.value);
    const dataAtual = new Date();
    if (dataNascimento >= dataAtual) {
      this.adicionarErro("Data de nascimento inválida");
      return false;
    }
    return true;
  }

  validarFormulario() {
    this.ocultarErros();
    this.limparErros();
    let formularioValido = true;
    if (!this.validarNome()) {
      formularioValido = false;
    }
    if (!this.validarEmail()) {
      formularioValido = false;
    }
    if (!this.validarSenha()) {
      formularioValido = false;
    }
    if (!this.validarConfirmarSenha()) {
      formularioValido = false;
    }
    if (!this.validarDataNascimento()) {
      formularioValido = false;
    }
    if (!formularioValido) {
      this.mostrarErros();
    }
    return formularioValido;
  }
}

const form = document.getElementById("formulario-registro");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const formulario = new FormularioRegistro();
  if (formulario.validarFormulario()) {
    alert("Formulário válido");
  }
});
