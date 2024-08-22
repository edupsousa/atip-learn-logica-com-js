class BancoDeDados {
  #usuarios = [
    {
      email: "joao@acme.com",
      senha: "123456",
      nome: "João da Silva",
    },
    {
      email: "maria@acme.com",
      senha: "654321",
      nome: "Maria de Souza",
    },
  ];

  buscarUsuario(email) {
    for (let usuario of this.#usuarios) {
      if (usuario.email === email) {
        return usuario;
      }
    }
    return null;
  }
}

class SistemaSingleton {
  static #instancia = null;
  #bancoDeDados;
  #configuracao;
  #observadores;

  constructor() {
    this.#bancoDeDados = new BancoDeDados();
    this.#configuracao = {
      usuarioAtual: null,
    };
    this.#observadores = [];
  }

  static getInstancia() {
    if (this.#instancia === null) {
      this.#instancia = new SistemaSingleton();
    }
    return this.#instancia;
  }

  adicionarObservador(observador) {
    this.#observadores.push(observador);
    observador.atualizar(this.#configuracao.usuarioAtual);
  }

  notificarObservadores() {
    for (let observador of this.#observadores) {
      observador.atualizar(this.#configuracao.usuarioAtual);
    }
  }

  login(email, senha) {
    const usuario = this.#bancoDeDados.buscarUsuario(email);
    if (usuario && usuario.senha === senha) {
      this.#configuracao.usuarioAtual = usuario;
      this.notificarObservadores();
      return true;
    }
    return false;
  }

  logout() {
    this.#configuracao.usuarioAtual = null;
    this.notificarObservadores();
  }
}

class TelaLogin {
  #sistema;
  #tela;
  #email;
  #senha;
  #formulario;

  constructor(sistema) {
    this.#sistema = sistema;
    this.#tela = document.getElementById("tela-login");
    this.#formulario = document.getElementById("form-login");
    this.#email = document.getElementById("email");
    this.#senha = document.getElementById("senha");

    this.#formulario.addEventListener("submit", this.#onSubmit.bind(this));
    this.#sistema.adicionarObservador(this);
  }

  #onSubmit(evento) {
    evento.preventDefault();
    this.#sistema.login(this.#email.value, this.#senha.value);
  }

  atualizar(usuarioAtual) {
    if (usuarioAtual) {
      this.#tela.style.display = "none";
    } else {
      this.#tela.style.display = "block";
    }
  }
}

class TelaBemVindo {
  #sistema;
  #tela;
  #nome;
  #logout;

  constructor(sistema) {
    this.#sistema = sistema;
    this.#tela = document.getElementById("tela-bemvindo");
    this.#nome = document.getElementById("nome");
    this.#logout = document.getElementById("logout");

    this.#logout.addEventListener("click", this.#onLogout.bind(this));

    this.#sistema.adicionarObservador(this);
  }

  #onLogout() {
    this.#sistema.logout();
  }

  atualizar(usuarioAtual) {
    if (usuarioAtual) {
      this.#nome.textContent = usuarioAtual.nome;
      this.#tela.style.display = "block";
      this.#logout.style.display = "block";
    } else {
      this.#tela.style.display = "none";
      this.#logout.style.display = "none";
    }
  }
}

const sistema = SistemaSingleton.getInstancia();
const telaLogin = new TelaLogin(sistema);
const telaBemVindo = new TelaBemVindo(sistema);
