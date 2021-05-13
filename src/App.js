import { Component } from 'react';
import './App.css';

const regexEspecial = /^(?=.*[@!#$%^&*()/\\])/;
const regexaz = /^(?=.*[a-z])/;
const regexazMais = /^(?=.*[A-Z])/;
const regex09 = /^(?=.*[0-9])/;

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            pwd_sec: '',
            security: false,
            especial: false,
            az: false,
            azMais: false,
            num09: false,
            qtdchar: false,
        };
    }

    _verifyPassword = async (event) => {
        let ok = 0;
        const vPassword = event.target.value.toString().trim();

        if (vPassword.length === 0) {
            this.setState({
                pwd_sec: '',
                security: false,
                especial: false,
                az: false,
                azMais: false,
                num09: false,
                qtdchar: false,
            });
            return;
        }

        // Senha com char especial
        if (regexEspecial.test(vPassword)) {
            this.setState({ especial: true });
            ok = ++ok;
        } else {
            this.setState({ especial: false });
        }

        // senha de "a" a "z" minuscula
        if (regexaz.test(vPassword)) {
            this.setState({ az: true });
            ok = ++ok;
        } else {
            this.setState({ az: false });
        }

        // senha de "A" a "Z" maisucula
        if (regexazMais.test(vPassword)) {
            this.setState({ azMais: true });
            ok = ++ok;
        } else {
            this.setState({ azMais: false });
        }

        // senha de 0 a 9
        if (regex09.test(vPassword)) {
            this.setState({ num09: true });
            ok = ++ok;
        } else {
            this.setState({ num09: false });
        }

        // maior que 8
        if (vPassword.length > 8) {
            this.setState({ qtdchar: true });
            ok = ++ok;
        } else {
            this.setState({ qtdchar: false });
        }

        if (ok === 5) {
            this.setState({ pwd_sec: 'Senha 100% Segura', security: true });
        } else {
            this.setState({
                pwd_sec: 'Senha não segura ! ! !',
                security: false,
            });
        }
    };

    render() {
        return (
            <div className="text-center bg-gray-300 flex-column">
                <header>
                    <label className="uppercase tracking-wide text-bg-100 text-indigo-500 font-semibold">
                        {' '}
                        Validação de senha{' '}
                    </label>
                </header>
                <body>
                    <input
                        autoFocus
                        placeholder="Digite sua senha aqui"
                        className="rounded-lg m-2"
                        id="password"
                        type="text"
                        onKeyUpCapture={this._verifyPassword}
                    ></input>
                </body>
                <div className="flex-column">
                    <ul>
                        <li
                            className={
                                this.state.az === true
                                    ? 'bg-green-100'
                                    : 'bg-red-100'
                            }
                        >
                            Caracteres Minúsculos
                        </li>
                        <li
                            className={
                                this.state.azMais === true
                                    ? 'bg-green-100'
                                    : 'bg-red-100'
                            }
                        >
                            {' '}
                            Caracteres Maíusculos{' '}
                        </li>
                        <li
                            className={
                                this.state.especial === true
                                    ? 'bg-green-100'
                                    : 'bg-red-100'
                            }
                        >
                            {' '}
                            Caracteres Especiais{' '}
                        </li>
                        <li
                            className={
                                this.state.qtdchar === true
                                    ? 'bg-green-100'
                                    : 'bg-red-100'
                            }
                        >
                            {' '}
                            Maior que 8 Caracteres{' '}
                        </li>
                        <li
                            className={
                                this.state.num09 === true
                                    ? 'bg-green-100'
                                    : 'bg-red-100'
                            }
                        >
                            {' '}
                            Números{' '}
                        </li>
                    </ul>
                </div>

                <span
                    className={
                        this.state.security === true
                            ? 'bg-green-100 flex-column block font-medium'
                            : 'bg-red-100 flex-column block  font-medium'
                    }
                >
                    {this.state.pwd_sec}
                </span>
            </div>
        );
    }
}
